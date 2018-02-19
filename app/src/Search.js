/* global Demo, React, ReactDOM, firebase */

// Search
var hashTag = "";
var Search = React.createClass({
  imageUpload: null,
  profilePromise: null,
  profile: {},
  getInitialState() {
    // this.profilePromise = new Promise();
    Demo.getProfile().then((resp) => {
      console.log(resp);
      this.profile = resp;
      // this.profilePromise.resolve(resp);
    });

    return { value: '' };
  },
  
  isLoading(val) {
    this.setState({...this.state, isLoading: val});
  },
  
  search(query) {
    this.setState({...this.state, error: false});
    // Demo.getTrack(this.state.value).then((resp) => {
    //   this.setResult(resp);
    // });
    
    if (this.imageUpload.isFileEmpty()){
      this.setState({...this.state, error: true});
      console.log('test');
      return;
    }
    
    if (this.state.value == '') {
      this.setState({...this.state, error: true});
      return;
    }
    
    // Hashtag management
    let queryText = this.findHashTag(this.state.value);
    console.log(queryText);
    if (queryText == '') {
      alert('Try #spotifybot-<your_feeling> to see magic!');
      // this.setState({...this.state, error: true});
      return;
    }
    
    this.isLoading(true);
    Demo.searchTracks(queryText).then((searchResults) => {
      if(searchResults.tracks.items.length == 0) {
        alert('Sorry the bot cannot find your hashtag :(');
      } else {
        const tracks = searchResults.tracks.items;
        // filter result (in general case -> only tracks that have preview_url)
        const filterResult = tracks.filter((item)=>{return item.preview_url != null});
        
        // check preview
        let previews = filterResult.map((item) => {return item.preview_url});
        if(previews.length == 0) {
          alert('No preview for this hashtag');
          return;
        }
        
        // get all audio features
        // 1) extract tracks id
        const trackIds = filterResult.map((item) => {return item.id});
        // 2) call api
        Demo.getAudioFeatures(trackIds).then((resp) => {
          console.log(resp);
          
          // 3) TODO: analysis somehow
          
          // 4) Select the track somehow
          // placeholder **
          const randomIndex = Math.floor(Math.random()*(filterResult.length));
          const selectedTrack = filterResult[randomIndex];
          
          // 5) upload and save to firebase
          // upload image and wait for
          this.imageUpload.uploadToServer().then((snapshot) => {
            console.log(snapshot);
            const imageUrl = snapshot.downloadURL;

            this.setResult(searchResults); 

            // setup data
            const data = {
              username: this.profile.id,
              caption: this.state.value,
              hashtag: hashTag,
              image: imageUrl,
              timestamp: Date.now(),
              list: previews,
              trackIds: trackIds,
              selectedTrack: selectedTrack,
            };

            this.saveToFirebase(this.profile.id, data).then(() => {
              this.setState({...this.state, value: ''});
              this.isLoading(false);
            });

            console.log(data);
          });
        });
        
        return;

        
      }
      
    }); 
  },
  
  saveToFirebase(id, data) {
    // Get a reference to the database service
    var database = firebase.database();

    var newPostKey = firebase.database().ref().child('posts').push().key;
    
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['posts/' + newPostKey] = data;
    
    return firebase.database().ref().update(updates).then((resp) => {
    // firebase.database().ref('posts/' + id).set(data).then((resp) => {
      console.log(resp);
    });

  },
  
  findHashTag(searchResults){
    //var str = "How are you doing today? #spotifybot-query  extra";
    //var str = "#spotifyBot-queRy extra text";

    searchResults = searchResults.toLowerCase();
    var res = searchResults.split("#spotifybot-");
    //var query = res.split(" ");
    var query = "";
    if(res.length > 1){
        query = res[1].split(" ");
    }
    console.log(query[0]);
    hashTag = query[0];
    if(hashTag == undefined) {
      return '';
    }
    
    var parseQuery = query[0].split("_");
    
    var query="";
    for (var i = 0; i < parseQuery.length; i++) {
        query += parseQuery[i] + " ";
    }
    console.log(query);

    return query;
  },

  
  handleChange(event) {
    this.setState({value: event.target.value});
  },
  
  setResult(searchResults) {
    this.setState({...this.state, searchResults: searchResults});
    console.log(this.state);
  },
  
  onTrackClick(uri) {
    console.log(uri);
    Demo.playTrack(uri);
  },
  
  onUploadFinish() {
    console.log('File upload success');
  },
  
  render() {
    let list = null;
    if(this.state.searchResults && this.state.searchResults.tracks) {
      list = (<div>
        {this.state.searchResults.tracks.items.map((track, index) => {
           return <Result />
          // return <li onClick={() => this.onTrackClick(track.uri)} key={ index }>{track.name}</li>;
        })}
      </div>);
    } else {
      list = <div className="noList"></div>;
    }
    
    let error = null;                           
    if(this.state.error) {
      error = (<div className="row"><div className="col-md-12"><div className="alert alert-danger">Please upload image and input the hashtag</div></div></div>);
    }   
               
    let loading = null;
    let loadingStyle = {opacity: 0};
    if(this.state.isLoading) {
        loading = <Loading />
      } else {
        loading = (<div>
          </div> );
                   loadingStyle.opacity = 1;
      }
                          
    
    return (<div className="container-fluid">
      {error}         
      {loading}        
      <div style={loadingStyle} className="row">
        <div className="col-md-12">
          <ImageUpload ref={instance => { this.imageUpload = instance; }} onUploadFinish={this.onUploadFinish} />
        </div>                       
        <div className="col-md-12">
          <div className="hashtag-box">
            <div className="hashtag-box-input">
                            
              <input value={this.state.value} onChange={this.handleChange} type="text" placeholder="Tag your music!" />
               
            </div>                   
            <div className="hashtag-box-button">
              <button onClick={this.search}>Post</button>
            </div>                   
          </div>                     
        </div>                   
      </div>                        
      {list}
    </div>);
  }
});
    

// dirty export
window.Search = Search;
/* global Demo, React, ReactDOM, firebase */

var PostList = React.createClass({
  getInitialState() {
	  Demo.analyzeSentiment("Hello");
    this.fetchPost();
    return {posts: []};
  },
  
  fetchPost() {
    var ref = firebase.database().ref('/posts').orderByChild('timestamp');
    
    ref.on('value', (snapshot) => {
        

      console.log(snapshot.val());
      var posts = this.snapshotToArray(snapshot);
      posts = posts.reverse();
      
      this.setState({...this.state, posts: posts});
    });
  },
  
  snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
  },
  render() {
    let list = null;
    if(this.state.posts.length > 0) {
      list = (<div>
        {this.state.posts.map((post, index) => {
           let uri, trackId, previewUrl;
         
           // aim to work with analysis - comment out if not use anymore
           if(post.selectedTrack) {
              previewUrl = post.selectedTrack.preview_url;
              trackId = post.selectedTrack.id;
              uri = post.selectedTrack.uri;
           } else {
              const index = Math.floor(Math.random()*(post.list.length));
              previewUrl = post.list[index];
              if(post.trackIds)
                trackId = post.trackIds[index];
           }
           
           return (<div><Result key={index} post={post} previewUrl={previewUrl} uri={uri} trackId={trackId} postId={index+'xxx'} /></div>);
          // return <li onClick={() => this.onTrackClick(track.uri)} key={ index }>{track.name}</li>;
        })}
      </div>);
    } else {
      list = <div><Loading /></div>;
    }
                 
    console.log(list);                        
    return (
      <div className="col-sm-12 postlist">
        {list}
      </div>
    )
  }
});

window.PostList = PostList;

/* global Demo, React, ReactDOM */

// Result
var playState="";
var Result = React.createClass({
  getInitialState() {
    return { value: '' };
  },
  
  render() {
    // let srcSong = "https://p.scdn.co/mp3-preview/638bef8fc49a59de69802d5d018ae5396515cb33?cid=774b29d4f13844c495f206cafdad9c86";
    let srcSong = this.props.previewUrl;
    // let idSong="123";
    let idSong = this.props.postId;
    return (
      <AudioEl post={this.props.post} src={srcSong} uri={this.props.uri} elId={idSong}/>
    );
  }
});

var AudioEl = React.createClass({
  getInitialState() {
    return { value: '' };
  },
  playMusic(elId, selectedTrack){
    // TODO: check token and webplayback api
    console.log(selectedTrack);
    if(Demo.webplaybackEnable && selectedTrack) {
      console.log('yeah you have webplayback :D');
      
      if(playState!="") {
        Demo.emitter.emit('PAUSE');
        playState="";
      } else {
        // emit event to webplayback component
        Demo.emitter.emit('PLAY', selectedTrack);
        playState=elId;
      }
      
    } else {
      let audioElement = document.getElementById(elId);
      if(audioElement){
        if(playState!=""){
          let oldAudioElement = document.getElementById(playState);
          oldAudioElement.pause();
          if(playState != elId){
            audioElement.play();
            playState=elId;
          }
          else{
            playState="";

          }
        } 
        else {
          audioElement.play();
          playState=elId;
        }

      }
    }
  },
  create_caption(caption,hashtag){
    var res = caption.split("#spotifybot-"+hashtag);

    let captionArray =["","#spotifybot-"+hashtag,""];
    if (res.length === 2){
      captionArray[0]= res[0]+" ";
      captionArray[2]= " "+res[1];
    }
    // console.log(res[0]+ "  "+res[1]);
    
    return captionArray;
  },

  render() {
    if(!this.props.post) {
    return (<div></div>);
    }
    let search = this.props.src;
    let caption = this.create_caption(this.props.post.caption,this.props.post.hashtag);
    //console.log(this.analyzeSentiment(caption));
    let date = new Date(parseInt(this.props.post.timestamp));
    let months =[ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    return (
      <div>
      <div className="col-sm-offset-3 col-sm-6 result-box">
        <div className="img-box">
          <img src={this.props.post.image} />
        </div>
        <div className="audioplayer">
          <audio id={this.props.elId} className="player" controls src={search}></audio>
        </div>
        <div className="captions">
          <span className="username">{this.props.post.username}</span>
          <span className="other-hashtag" >{caption[0]}</span>
          <a className="hashtag" onClick={()=>this.playMusic(this.props.elId, this.props.post.selectedTrack)}>{caption[1]}</a>
          <span className="other-hashtag" >{caption[2]}</span>

          <p className="timestamp">{date.getDate() + ' ' + (months[date.getMonth()]) + ' ' + date.getFullYear()}</p>
        </div>

      </div>
    </div>
      
    );
  }
});
    

// dirty export
window.Result = Result;
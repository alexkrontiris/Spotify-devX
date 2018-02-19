/* global Demo, React, ReactDOM, firebase */

var Playback = React.createClass({
  getInitialState() {
    Demo.transferPlayback().then(() => {
      
    }, (error) => {
      Demo.webplaybackEnable = false;
    });
    this.listenForFocusOnWebPlayer();
    return {ready: false};
  },
  // Listen for event 
  componentWillMount() { 
    Demo.emitter.on('PLAY', (track) => {
      console.log('PLAY FROM FARAWAY COMPONENT' + track.uri);
      this.setState({...this.state, track});
      Demo.playTrack(track.uri);
    }); 
    
    Demo.emitter.on('PAUSE', () => {
      console.log('PAUSE FROM FARAWAY COMPONENT');
      Demo.WebPlaybackSDK.pause();
    }); 
  },

  //Remove listener 
  componentWillUnmount(){ 
    Demo.emitter.off('PLAY');
    Demo.emitter.off('PAUSE');
  },
  
  listenForFocusOnWebPlayer() {
    let _this = this;
    let stateHandlerCallback = (state) => {
      _this.stateHandler(state);
    };
    
    // Call once when connected
    Demo.WebPlaybackSDK.getCurrentState().then(stateHandlerCallback);

    // When a change is made
    Demo.WebPlaybackSDK.on("player_state_changed", stateHandlerCallback);

    // Poll status every 0.1 seconds
    // This is just to improve the UI for the progress bar
    setInterval(() => {
      Demo.WebPlaybackSDK.getCurrentState().then(stateHandlerCallback);      
    }, 100);
  },
  
  stateHandler(state) {
    if(state === null) {
      this.setState({...this.state, ready: false});
    } else {
      this.setState({...this.state, ready: true});
    }
  },
  
  waitingToStart() {
    let player_name = Demo.WebPlaybackSDK._options.name;

    return (
      <div>
      </div>
    );
  },
                                 
  render() {
     // Start waiting to hear back from Demo.WebPlaybackSDK
    // Demo.transferPlayback();          // Transfer playback to SDK (via Connect Web API over HTTP)
    if (!Demo.webplaybackEnable) {
      return (this.waitingToStart());
    }
    else if (this.state.ready == '') {
      return (this.waitingToStart());
    } else {
      return (
        <div className="playback">
        <div className="player-container">
          <div className="track-info col-sm-offset-3 col-sm-4">
            <div className="album-art"><img src={this.state.track ? this.state.track.album.images[0] : ''} /></div>
            <div className="artist">
              <p className="strong">{this.state.track ? this.state.track.name : ''}</p>
              <p>{this.state.track ? this.state.track.album.name : ''}</p>
            </div>
          </div>
          <div className="controls col-sm-2">
              <ul>
                <li><a className="fa fa-play"></a></li>
                <li><a className="fa fa-volume-off"></a></li>
              </ul>
          </div>
        </div>
      </div>
      );
    }

  }
});

window.Playback = Playback;
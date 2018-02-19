/* global Demo, React, ReactDOM */

/********************************
 ********************************
 **** RENDER OUR APPLICATION ****
 ********************************
 ********************************/

// to display the login
if (Demo.isAccessToken() === false) {
  ReactDOM.render((<div><Authorize /><PostList/></div>), document.getElementById('screen'));
} else {
  ReactDOM.render((<div><App /><PostList /></div>), document.getElementById('screen'));
}

Demo.onSpotifyPlayerConnected = (data) => {
  ReactDOM.render(<Playback />, document.getElementById('playback'));
};

Demo.onSpotifyUserSessionExpires = () => {
  Demo.WebPlaybackSDK.disconnect(); // Disconnect the player

  ReactDOM.render(
    <div>
      <PlayerError
        heading="Session expired."
        message="Playback sessions only last 60 minutes. Refresh for new session." />
      <Authorize />
    </div>,
    document.getElementById('screen')
  );
};

Demo.renderWebPlaybackSDKError = (title, e) => {
  ReactDOM.render(
    <PlayerError heading={title} message={e} />,
    document.getElementById('screen')
  );
};
/* global Spotify, Demo */

/**
 * (C) 2017 Spotify AB
 */

/**
 * window.onSpotifyWebPlaybackSDKReady
 * This is a function required by the Web Playback SDK.
 * If we don't call this, an error is thrown.
 *
 * See more at https://beta.developer.spotify.com/documentation/web-playback-sdk/reference/#initializing-the-sdk
 */
Demo.playerCheckPromise = () => {
  return new Promise((resolve, reject) => {
  });
};
window.onSpotifyWebPlaybackSDKReady = () => {
  console.log('onSpotifyWebPlaybackSDKReady');
  if (Demo.isAccessToken()) {
    // Initialize the SDK
    let spotifyPlayer = new Spotify.Player({
      name: "Best player ever! 😱 🙌🏼",
      volume: 0.8,
      getOAuthToken: cb => {
        if (Demo.isAccessToken()) {
          cb(Demo.getAccessToken());
        }
      }
    });

    // Error handling
    spotifyPlayer.on("initialization_error", (e) => {
      console.log(e.message);
      Demo.webplaybackEnable = false;
      // window.renderWebPlaybackSDKError("Initialization Error", e.message);
    });

    spotifyPlayer.on("authentication_error", (e) => {
      console.log(e.message);
      Demo.webplaybackEnable = false;
      // window.renderWebPlaybackSDKError("Authentication Error", e.message);
    });

    spotifyPlayer.on("account_error", (e) => {
      console.log(e.message);
      Demo.webplaybackEnable = false;
      // window.renderWebPlaybackSDKError("Account Error", e.message);
    });

    spotifyPlayer.on("playback_error", (e) => {
      console.log(e.message);
      Demo.webplaybackEnable = false;
      // window.renderWebPlaybackSDKError("Playback Error", e.message);
    });

    // Make our player go live
    spotifyPlayer.connect();

    // Make the player globally accessible
    Demo.WebPlaybackSDK = spotifyPlayer;

    // Run our internal method of when the player has connected
    spotifyPlayer.on("ready", (data) => { 
      Demo.webplaybackEnable = true;
      Demo.onSpotifyPlayerConnected(data); 
    });
  }
};

/* global Demo, TinyEmitter */

/**
 * (C) 2017 Spotify AB
 */

const Demo = {
  /**
   * The user's access token from Spotify. Lasts 60 minutes.
   *
   * Code Sample:
   *   console.log(Demo.access_token);
   */
  access_token: null,

  /**
   * Our local instance of Web Playback SDK.
   *
   * Code Sample:
   *   console.log(Demo.WebPlaybackSDK);
   */
  WebPlaybackSDK: null,

  /**
   * Some custom callbacks we've created.
   */
  renderWebPlaybackSDKError:   null, // Throw an error (our app equiv. of console.error)
  onSpotifyPlayerConnected:    null, // User session starts
  onSpotifyUserSessionExpires: null, // User session expires
  
  /**
   * Transfer Playback.
   *
   * See https://beta.developer.spotify.com/documentation/web-api/
   *
   * Example code:
   *   Demo.transferPlayback()
   */
  transferPlayback: () => {
    let request = new Request("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      headers: new Headers({
        'Content-Type':  'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + Demo.getAccessToken()
      }),
      body: JSON.stringify({
        play: false,
        device_ids: [Demo.WebPlaybackSDK._options.id]
      })
    });
    
    return window.fetch(request).then(() => {
      console.log('ddd');
    }).catch(function() {
      console.log("error");
    });
  },
  
  /**
   * Play a track.
   *
   * See https://beta.developer.spotify.com/documentation/web-api/
   *
   * Example code:
   *   Demo.playTrack("spotify:track:1j4kHkkpqZRBwE0A4CN4Yv")
   */
   playTrack: (uri) => {
     let request = new Request("https://api.spotify.com/v1/me/player/play", {
       method: "PUT",
       headers: new Headers({
         'Content-Type':  'application/json; charset=utf-8',
         'Authorization': 'Bearer ' + Demo.getAccessToken()
       }), 
      body: JSON.stringify({ uris: [uri,,] })
     });
     
     return window.fetch(request).then((resp) => resp.json());
   },
  
  /**
   * Search
   *
   * See https://beta.developer.spotify.com/documentation/web-api/
   *
   * Example code:
   *   Demo.searchTracks("Kanye West").then((searchResults) => { console.log(searchResults); });
   */
   searchTracks: (query) => {
     let request = new Request("https://api.spotify.com/v1/search?type=track&q="+query+"*&market=from_token", {
       method: "GET",
       headers: new Headers({
         'Content-Type':  'application/json; charset=utf-8',
         'Authorization': 'Bearer ' + Demo.getAccessToken()
       })
     });
     
     return window.fetch(request).then((resp) => resp.json());
   },
  
  getTrack: (query) => {
    let request = new Request("https://api.spotify/com/v1/search?query="+query, {
      method: "GET",
      headers:new Headers({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + Demo.getAccessToken()
      })
    });
    return window.fetch(request).then((resp) => resp.json());
  },
  
   getProfile: () => {
     let request = new Request("https://api.spotify.com/v1/me", {
       method: "GET",
       headers: new Headers({
         'Content-Type':  'application/json; charset=utf-8',
         'Authorization': 'Bearer ' + Demo.getAccessToken()
       })
     });
     
     return window.fetch(request).then((resp) => resp.json());
   },
  
   getAudioFeatures: (ids) => {
     let request = new Request("https://api.spotify.com/v1/audio-features/?ids=" + ids.join(","), {
      method: "GET",
      headers:new Headers({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + Demo.getAccessToken()
      })
    });
    return window.fetch(request).then((resp) => resp.json());
   },
  
  analyzeSentiment: (data) => {
     let request = new Request('http://localhost:4443', {
      method: "POST",
      body: data
    });
    return window.fetch(request).then((resp) => resp.json());
     
  },
  
  emitter: new TinyEmitter()
  
};

# Building a Spotify Player Workshop

<b><em>Important: Do not share this workshop, it is not quite ready for the public to see yet. We'll let you know when you can share your hacks.</em></b>

This workshop will set you up to build your own player, in the web, using the brand new Spotify Web Playback SDK. Let's go.

## Warm up

1. Figure out how to embed the Web Playback SDK in a HTML page. (Hint: Look at `index.html` towards the bottom of the page).
2. Let's preview our project. Click "Show (Live)" at the top to see your project.
3. Make sure you have Spotify Premium. If you don't, speak to a Spotifier and we'll work something out.
4. Get excited about HTML, CSS, JavaScript, React and APIs. We're going to get our hands dirty, and learn some awesome web stuff.
5. Be sure to ask for help - it's our job and we really love helping others!

## Task 1: Set our client credentials

You can go to the [Spotify Developer Dashboard](https://beta.developer.spotify.com/dashboard/) to register your application. It's free.

You'll need to do the following tasks:
- Get the Client ID (we don't need the Client Secret for this demo.)
- Go to Settings > Redirect URIs > Add New (The URL you want to paste is `https://[name-on-the-top-left].glitch.me` - for example, the Redirect URI for my project would have been `https://spotify-workshop.glitch.me`)
- Don't forget to save your changes on the task above!
- Paste them in `src/Demo.Auth.js` in the respective areas.

That's it! You did great. Check your app - it should be working!

## Task 2: Rename our Player

Let's give our player some personality.
We want to impress our friends with our pretty slick player.

Go change the player.

- **Hint: You can use emojis in your player name!** 😱 🙌🏼
- Need some help? Take a look in `src/Demo.WebPlaybackSDK.js`

## Task 3: Let's add some controls to our player.

Let's add some new controls to our Player.

We have already implemented `mute`, `setVolumeToMax`, `reverse15Seconds`, `skip15Seconds`, and `startFromBeginning` for you in the `<PlayerControls />` React component in `src/App.js`.

You just need to build the UI for them. Take a look and see how we did it for the Previous, Pause/Play, and Skip buttons.

## Task 4: Let's display album names in our project.

We display the album art, track name, and the artists. We want people to be able to see the album name, just in case they're interested.

So let's make that happen.

In the `<Player />` React component in `src/App.js`, we already defined the `album_name` for you. You just need to display it. You can optionally choose to create a new React component, or write it inline. Whatever works for you.

Extra fun task: You could even go a step further and make the album names, track names, and artist names clickable and send them to the appropriate link on `https://open.spotify.com`.

## Task 5: Let's add search in our project (Advanced, Optional)

Using the [Spotify Web API](beta.developer.spotify.com/documentation/web-api/), we can search for tracks.

Let's build that into our player. The `Demo.playTrack(uri)` and `Demo.searchTracks(query)` have been implemented for you. You just need to build the UI for it.

See `src/Demo.Initialization.js` to get started.

## You're Done!

High-five! You built an awesome app. We're proud of you.

You are now free to roam in the wild, with the Web Playback SDK, and a tiny bit of the Web API too. This means fantastic things for you. You can build awesome, fun, and really exciting hacks for any Spotify music lover this weekend!

Let us know if you had fun. Most importantly, ask us questions! Lots of them!

## Additional Resources

- [Take a look at a more advanced demo.](https://spotify-web-playback-sdk.glitch.me)
- [Take a look at our Overview](https://beta.developer.spotify.com/documentation/web-playback-sdk/)
- [Take a look at our Quick Start](https://beta.developer.spotify.com/documentation/web-playback-sdk/quick-start/)
- [Take a look at our API Documentation](https://beta.developer.spotify.com/documentation/web-playback-sdk/reference/)

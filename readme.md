## Node server to be hosted in Digital Ocean droplet.

- Config this to listen for requests @ api.joevanbio.icu  
I dunno how but I am gonna try.

Hit api's for:
- protonmail
- github:
  - get latest build info: `GET /repos/:owner/:repo/pages/builds/latest` [docs](https://developer.github.com/v3/repos/pages/#get-latest-pages-build)
- twitter:
  - https://developer.twitter.com/en/docs.html
- linkedin

Dont really care what you do with those api's but I want you to hit them for the sake of trying stuff out.

lets do some work with API from twitch..
Can we get a thing that sends a message when a stream goes live? Surely

https://glass.twitch.tv/console/apps
https://dev.twitch.tv/docs/api/webhooks-guide/

so what are my problems at the moment?
- my webhook subscription request isnt receiving any responseBody (maybe not a problem)
- the callback url that I gave the webhook doesnt seem to be getting any requests coming into it

What do?
Try subscribe to a webhook of a popular streamer

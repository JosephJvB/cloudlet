const got = require('got')

const URL = 'https://api.twitch.tv/helix/webhooks/hub' // ?user_id=USER_ID

function SUBSCRIBE (ID, SECRET) {
  const OPTS = {
    headers: {'Client-Id': ID, 'Content-Type': 'application/json', 'Accept': 'application/json'},
    body: JSON.stringify({
      'hub.callback': 'https://api.joevanbio.icu/callback',
      'hub.mode': 'subscribe',
      // 'hub.topic': 'https://api.twitch.tv/helix/streams?user_id=61614939', // joe
      'hub.topic': 'https://api.twitch.tv/helix/users/follows?first=1&to_id=137512364', // overwatchleague 
      // 'hub.secret': SECRET, // strip it down to the barest bones to debug
      'hub.lease_seconds': 120
    })
  }
  // headers must be lower-case 'h' or no good!
  got(URL, OPTS)
    .then(res => {
      console.log('subbd:', res.statusCode, res.statusMessage, res.body)
    })
    .catch(err => {
      console.error('oop\n', err)
    })
}

function UNSUBSCRIBE (ID) {
  const OPTS = {
    headers: {'Client-Id': ID, 'Content-Type': 'application/json'},
    body: JSON.stringify({
      'hub.callback': 'http://localhost/callback',
      'hub.mode': 'unsubscribe',
      'hub.topic': 'https://api.twitch.tv/helix/streams?user_id=57156551', // ami
      // 'hub.secret': SECRET
    })
  }
  got(URL, OPTS)
  .then(res => {
    console.log('unsub\n')
  })
  .catch(err => {
    console.error('oop\n', err)
  })
}

module.exports = {
  SUBSCRIBE,
  UNSUBSCRIBE
}
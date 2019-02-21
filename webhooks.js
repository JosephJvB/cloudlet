const got = require('got')

const URL = 'https://api.twitch.tv/helix/webhooks/hub' // ?user_id=USER_ID

function SUBSCRIBE (ID, SECRET) {
  const OPTS = {
    headers: {'Client-Id': ID, 'Content-Type': 'application/json'},
    body: JSON.stringify({
      'hub.callback': 'http://localhost/callback',
      'hub.mode': 'subscribe',
      'hub.topic': 'https://api.twitch.tv/helix/streams?user_id=61614939', // joe
      'hub.secret': SECRET,
      'hub.lease_seconds': 20
    })
  }
  // headers must be lower-case 'h' or no good!
  got(URL, OPTS)
    .then(res => {
      console.log('subbd\n')
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
      'hub.secret': SECRET
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
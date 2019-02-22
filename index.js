const express = require('express')
const fs = require('fs')
const path = require('path')

const GithubAPI = require('./github-api')
const {SUBSCRIBE, UNSUBSCRIBE} = require('./webhooks')

// i can set env vars like this, but it means I have to manually update the SECRETS.json file on th droplet..
const config = './SECRETS.json'
if(fs.existsSync(config)) {
  const data = JSON.parse(fs.readFileSync(config))
  process.env = Object.assign({}, process.env, data)
}

const PORT = process.env.DROPLET ? 80 : 3000
const server = express()
server.use(express.json())
// benched
// server.use('/github', GithubAPI) // "/pages/builds"
// catch twitch challenge here
server.get('/callback', (req, res) => {
  console.log('DEETS', req.method, req.headers, req.url, req.body)
  const challenge = req.query['hub.challenge']
  console.log('CHALLENGE', challenge, '\n', req.query)
  res.status(202).send(challenge)
})

server.use((req, res) => {
  console.log('***', req.method, req.headers, req.url, req.body)
  res.send(200)
})

const app = server.listen(
  PORT,
  () => {
    console.log('SERVER UP @', PORT),
    SUBSCRIBE(
      process.env.TWITCH_CLIENT_ID,
      process.env.TWITCH_SECRET
    )
  }
)

process.on('uncaughtException', (err) => {
  console.log('ONCE MORE INTO THE BREACH', err)
  // UNSUBSCRIBE(process.env.TWITCH_CLIENT_ID)
  app.close(() => process.exit(1))
})
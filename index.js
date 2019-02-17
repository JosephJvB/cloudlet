const express = require('express')
const fs = require('fs')
const path = require('path')

const GithubAPI = require('./github-api')

// i can set env vars like this, but it means I have to manually update the SECRETS.json file on th droplet..
const config = './SECRETS.json'
if(fs.existsSync(config)) {
  const data = JSON.parse(fs.readFileSync(config))
  process.env = Object.assign({}, process.env, data)
}

const server = express()
server.use(express.json())
server.use('/github', GithubAPI) // "/pages/builds"

const app = server.listen(
  process.env.DROPLET ? 80 : 3000,
  console.log('RAIN DROP DROP TOP @ 3000')
)

process.on('uncaughtException', (err) => {
  console.log('ONCE MORE INTO THE BREACH')
  app.close(() => process.exit(1))
})
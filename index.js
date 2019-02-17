const express = require('express')
const fs = require('fs')
const path = require('path')

const config = './SECRETS.json'
if(fs.existsSync(config)) {
  const data = JSON.parse(fs.readFileSync(config))
  process.env = Object.assign({}, process.env, data)
}

console.log(process.env.TEST)

const server = express()
server.use(express.json())

server.get('/', (req, res) => {
  res.send('hellowpeople')
})

const app = server.listen(3000, console.log('RAIN DROP DROP TOP @ 3000'))

process.on('uncaughtException', (err) => {
  console.log('ONCE MORE INTO THE BREACH')
  app.close(() => process.exit(1))
})
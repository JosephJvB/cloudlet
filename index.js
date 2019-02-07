const express = require('express')

const server = express()
server.use(express.json())

server.get('/lab-test', (req, res) => {
  console.log('i wonder where these go?')
  res.status(200).send('GR8 SUCCESS')
})

const app = server.listen(80, console.log('RAIN DROP DROP TOP @ 80'))

process.on('uncaughtException', (err) => {
  console.log('ONCE MORE INTO THE BREACH')
  app.close(() => process.exit(1))
})
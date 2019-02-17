const router = require('express').Router()
const got = require('got')
const BUILDS_URL = 'https://api.github.com/repos/JosephJvB/JosephJvB.github.io/pages/builds'
const ME_URL = 'https://api.github.com/users/JosephJvB'

router.get('/pages/builds', (req, res) => {
  got(BUILDS_URL, {
    headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` }
  })
  .then(response => {
    const data = JSON.parse(response.body)
    let successBuilds = 0 
    let failedBuilds = 0
    for(let build of data) {
      if(build.status === 'built') successBuilds++
      if(build.status === 'errored') failedBuilds++
    }
    const buildData = {
      numBuilds: data.length,
      successBuilds,
      failedBuilds
    }
    res.status(200).send(buildData)
  })
  .catch(err => {
    console.log('G-API-ERROR @pages-repo {IS AUTH ROUTE}', err.message)
    res.status(500).send(err)
  })
})

router.get('/joevanbo', (req, res) => {
  got(ME_URL)
    .then(response => {
      res.status(200).send(JSON.parse(response.body))
    })
    .catch(err => {
      console.log('G-API-ERROR @users/JosephJvB')
      res.status(500).send(err)
    })
})

module.exports = router
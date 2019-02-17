const router = require('express').Router()
const got = require('got')

router.get('/pages/builds', (req, res) => {
  got('https://api.github.com/repos/JosephJvB/JosephJvB.github.io/pages/builds', {
    headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` }
  })
  .then(response => {
    const data = JSON.parse(response.body)
    const buildData = {
      numBuilds: data.length,
      ...data.reduce((a, d) => {
        if(d.status === 'built') a.success++
        if(d.status === 'errored') a.failure++
        return a
      }, {success: 0, failure: 0})
    }
    res.status(200).send(buildData)
  })
  .catch(err => {
    console.log('GITHUB API: REQ BUILD DATA ERROR', err.message)
    res.status(400).send(err)
  })
})

module.exports = router
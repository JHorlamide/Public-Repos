const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const dotenv = require('dotenv').config()

const RepoRouteConfig = require('./src/github_public_repo/route.config')

const app = express()
const port = 9000

app.use(cors())
app.use(helmet())
RepoRouteConfig.routeConfig(app)

const runningMessage = `Server running at http://localhost:${port}...`

app.get('/', (req, res) => {
  res.status(200).send(runningMessage)
})

app.listen(port, function () {
  console.log(runningMessage)
})

module.exports = app;
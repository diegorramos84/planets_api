const express = require('express')
const cors = require('cors')
const logger = require("./logger")

const planetsRoutes = require('./router/planets')

const app = express()
app.use(cors())
app.use(express.json())

app.use(logger)

app.use('/planets', planetsRoutes)


module.exports = app

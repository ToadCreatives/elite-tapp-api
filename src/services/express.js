'use strict'

const config = require('../config')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const errorHandler = require('../middlewares/error-handler')
const apiRouter = require('../routes/api')
const passport = require('passport')
const passportJwt = require('../services/passport')
const swaggerUi = require('swagger-ui-express')
const path = require('path')

const swaggerJSDoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
    info: {
      title: 'Hello World', // Title (required)
      version: '1.0.0' // Version (required)
    }
  },
  // Path to the API docs
  apis: [path.resolve(__dirname, '../routes/**/*.js')]
}

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options)
console.log(options)
console.log(swaggerSpec)

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(helmet())

if (config.env !== 'test') app.use(morgan('combined'))

// passport
app.use(passport.initialize())
passport.use('jwt', passportJwt.jwt)

app.use('/api', apiRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})
app.use(errorHandler.handleNotFound)
app.use(errorHandler.handleError)

exports.start = () => {
  app.listen(config.port, (err) => {
    if (err) {
      console.log(`Error : ${err}`)
      process.exit(-1)
    }

    console.log(`${config.app} is running on ${config.port}`)
  })
}

exports.app = app

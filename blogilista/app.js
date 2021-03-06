const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const loginRouter = require('./controllers/login')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const commentsRouter = require('./controllers/comments')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const { errorHandler, tokenParser } = require('./utils/middleware')

logger.info('connecting to database at ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    logger.info('connected to MongoDB.')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB: ', error.message)
  })

app.use(cors())
app.use(bodyParser.json())
app.use(tokenParser)
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/blogs', commentsRouter)
app.use('/api/users', usersRouter)

if (process.env.NODE_ENV === 'test') {
  console.warn('==== ENABLING TESTING ROUTER ====')
  console.warn('This allows dropping blog/user tables via /testing/reset')

  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(errorHandler)

module.exports = app

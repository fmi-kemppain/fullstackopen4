require('dotenv').config()
const express = require('express')
require('express-async-errors');
const app = express()
const middleware = require('./utils/middleware')
const cors = require('cors')
const mongoose = require('mongoose')

const loginRouter = require('./controllers/loginRouter')
const blogsRouter = require('./controllers/blogsRouter')
const usersRouter = require('./controllers/usersRouter')

mongoose.connect(process.env.MONGO_URL)

app.use(cors())
app.use(express.json())
app.use('/api/login', loginRouter)
app.use('/api/blogs', middleware.userExtractor, middleware.tokenExtractor, blogsRouter)
app.use('/api/users', middleware.tokenExtractor, usersRouter)

app.use(middleware.errorHandler)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
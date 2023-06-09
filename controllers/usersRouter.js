const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    users.populate('blogs')
    response.json(users)
  })

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (await User.find({"username": username}).count()) {
    return response.status(403).send('Username is taken')
  }

  if (!username || !name || !password) {
    return response.status(403).send('Provide username, name and password')
  }

  if (username.length < 3 || password.length < 3) {
    return response.status(403).send('Username and password must be at least 3 characters')
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter
const jwt = require('jsonwebtoken')
const logger = require('./logger')

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name ===  'JsonWebTokenError') {
        return response.status(400).json({ error: 'token missing or invalid' })
    }

    next(error)
}

const tokenExtractor = async (request, response, next) => {
    
    const authorization = request.get('authorization')

    if (!authorization) {
        return response.status(401).json({ error: 'authorization missing' })
    }

    const bearer = authorization.replace('Bearer ', '')
    request.token = jwt.verify(bearer, process.env.LOGIN_TOKEN_SECRET)
    
    next()
}

const userExtractor = async (request, response, next) => {

    const authorization = request.get('authorization')

    if (!authorization) {
        return response.status(401).json({ error: 'authorization missing' })
    }

    const bearer = authorization.replace('Bearer ', '')
    request.user = jwt.decode(bearer, process.env.LOGIN_TOKEN_SECRET)

    next()
}

module.exports = {
    errorHandler,
    tokenExtractor,
    userExtractor
}
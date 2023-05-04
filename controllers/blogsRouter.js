const Blog = require('../models/blog')
const User = require('../models/user')
const blogsRouter = require('express').Router()

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if ( blog.user.toString() !== request.user.toString() ) {
        return response.status(400).json({ error: 'not your blog' })
    }

    blog.delete();
})

blogsRouter.post('/', async (request, response) => {

    const body = request.body

    const user = await User.findById(request.body.userId)

    const blog = new Blog({
        title: request.body.title,
        author: user.username
    })

    if (body.content === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }

    if (!request.token.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    if (request.user.username !== user.username) {
        return response.status(400).json({ error: 'not your blog' })
    }

    savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

module.exports = blogsRouter
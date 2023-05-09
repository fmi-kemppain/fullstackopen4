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

blogsRouter.put('/:id', async (request, response) => {

    const body = request.body

    const blog = await Blog.findOneAndUpdate({
        _id: request.params.id
    },
    {
        title: request.body.title,
        likes: request.body.likes
    },
    {
        new: true
    })

    response.status(201).json(blog)
})

blogsRouter.post('/', async (request, response) => {

    const body = request.body

    const author = await User.findById(request.body.author)

    const blog = new Blog({
        title: request.body.title,
        author: author.username
    })

    if (body.title === undefined) {
        return response.status(400).json({ error: 'title missing' })
    }

    savedBlog = await blog.save()
    author.blogs = author.blogs.concat(savedBlog._id)
    await author.save()

    response.status(201).json(savedBlog)
})

module.exports = blogsRouter
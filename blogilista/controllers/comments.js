const jwt = require('jsonwebtoken')

const commentsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')

commentsRouter.get('/comments', async (request, response) => {
  try {
    const comments = await Comment
      .find({})
      .populate('blog', { comments: 0 })

    return response.json(comments)
  } catch (error) {
    return response.status(500).end()
  }
})

commentsRouter.post('/:id/comments', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)
    const newComment = request.body
    newComment.blog = blog
    const commentObj = new Comment(newComment)
    const savedComment = await commentObj.save()

    blog.comments = blog.comments
      ? blog.comments.concat(savedComment._id)
      : [savedComment._id]

    await blog.save()
    savedComment.toObject()
    savedComment.blog = blog
    return response.status(201).json(savedComment.toJSON())
  }
  catch (error) {
    return next(error)
  }
})

module.exports = commentsRouter
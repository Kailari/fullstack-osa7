import { showNotification } from './notificationReducer'
import blogService from '../services/blogs'

const likeBlog = blog => {
  return async dispatch => {
    try {
      const changedBlog = { ...blog, likes: blog.likes + 1, comments: blog.comments.map(c => c.id) }
      const updatedBlog = await blogService.update({ ...changedBlog, user: changedBlog.user._id })
      dispatch({
        type: 'BLOGS_VOTE',
        data: updatedBlog
      })

      dispatch(showNotification(`Liked ${blog.title}!`, 'ok'))
    } catch (error) {
      // Blog is likely invalid in some way, remove it from list
      dispatch(removeBlog(blog.id))
      dispatch(showNotification(`Error adding like: ${error.message}`, 'error'))
    }
  }
}

const removeBlog = blog => {
  return async dispatch => {
    try {
      await blogService.remove(blog)
      dispatch(showNotification(`Blog ${blog.title} removed!`, 'ok'))
    } catch (error) {
      dispatch(showNotification(`Error removing blog: ${error.message}`, 'error'))
    }

    dispatch({
      type: 'BLOGS_REMOVE',
      data: { id: blog.id }
    })
  }
}

const createBlog = blog => {
  return async dispatch => {
    try {
      const addedBlog = await blogService.create(blog)
      dispatch({
        type: 'BLOGS_CREATE',
        data: addedBlog
      })
      dispatch(showNotification(`Added a new blog: '${addedBlog.title}' by ${addedBlog.author}`, 'ok'))
    } catch (error) {
      dispatch(showNotification(`error creating blog: ${error.message}`, 'error'))
    }
  }
}

const addComment = (blog, comment) => {
  return async dispatch => {
    const addedComment = await blogService.addComment(blog, comment)
    dispatch({
      type: 'BLOGS_ADD_COMMENT',
      data: addedComment
    })
    dispatch(showNotification(`Added comment on: '${blog.title}'`, 'ok'))
  }
}

const initializeBlogs = callback => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'BLOGS_INIT',
      data: blogs
    })
    callback()
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'BLOGS_VOTE':
      return state.map(b => b.id !== action.data.id ? b : action.data)
    case 'BLOGS_INIT':
      return action.data
    case 'BLOGS_CREATE':
      return state.concat(action.data)
    case 'BLOGS_ADD_COMMENT':
      return state.map(blog => {
        const comment = action.data
        if (blog.id === comment.blog.id) {
          blog.comments = [...blog.comments, comment]
        }

        return blog
      })
    case 'BLOGS_REMOVE':
      return state.filter(b => b.id !== action.data.id)
    default:
      return state
  }
}

export default reducer
export {
  initializeBlogs,
  likeBlog,
  removeBlog,
  createBlog,
  addComment
}

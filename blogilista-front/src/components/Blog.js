import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { likeBlog, removeBlog } from '../reducers/blogsReducer'

const Blog = props => {
  const { user, blog, visible, setVisible } = props
  const showWhenVisible = { display: visible ? '' : 'none' }

  const handleClick = () => {
    setVisible(visible ? null : blog.id)
  }

  const remove = () => {
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)) {
      props.removeBlog(blog)
    }
  }

  const blogLink = () => <>
    <a target="_blank" rel="noopener noreferrer" href={blog.url}>{blog.url}</a>
  </>
  const blogLikes = () => <>
    {blog.likes} <button onClick={() => props.likeBlog(blog)}>Like</button>
  </>
  const blogComments = () => <>
    {blog.comments ? blog.comments.length : 0}
  </>
  const removeButton = () => <>
    <button onClick={remove}>Remove</button>
  </>

  return (
    <div className="blog entry">
      <div onClick={handleClick} className="title">
        <span className="toggle">{visible ? '- ' : '+ '}</span>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author}
      </div>
      <div style={showWhenVisible} className="details">
        URL: {blogLink()}<br />
        Likes: {blogLikes()}<br />
        Comments: {blogComments()}<br />
        Added by {blog.user.username}<br />
        {user && user.id === blog.user.id && removeButton()}
      </div>
    </div >
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  { likeBlog, removeBlog }
)(Blog)

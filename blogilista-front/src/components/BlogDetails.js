import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { likeBlog, removeBlog } from '../reducers/blogsReducer'
import CommentForm from '../components/CommentForm'

const BlogDetails = props => {
  const { user, target } = props

  const comments = () => {
    return (
      <>
        <CommentForm blog={target} />
        <ul >
          {target.comments && target.comments.map(comment =>
            <li key={comment.id}>{comment.content}</li>
          )}
        </ul>
      </>
    )
  }

  const handleBack = event => {
    event.preventDefault()
    props.history.goBack()
  }

  const remove = () => {
    if (window.confirm(`Remove blog '${target.title}' by ${target.author}?`)) {
      props.removeBlog(target)
      props.history.goBack()
    }
  }

  return (
    <div className="blog details">
      <div className="back">
        <a href="#" onClick={handleBack}>{'<< back'}</a>
      </div>
      <h2>{target.title}</h2>
      <div className="blog subtitle">by {target.author}</div>
      <div className="info">
        <table>
          <tbody>
            <tr>
              <td>URL:</td>
              <td><a target="_blank" rel="noopener noreferrer" href={target.url}>{target.url}</a></td>
            </tr>
            <tr>
              <td>Likes:</td>
              <td className="count">{target.likes} <button onClick={() => props.likeBlog(target)}>Like!</button></td>
            </tr>
            <tr>
              <td>Added by</td>
              <td>{target.user.name}</td>
            </tr>
            {user && user.id === target.user.id &&
              <tr>
                <td style={{ borderRight: 'none' }}><button onClick={remove}>Remove</button></td>
                <td style={{ borderLeft: 'none' }}></td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      <div className="comments">
        <h3>Comments {target.comments && `(${target.comments.length})`}</h3>
        {comments()}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default withRouter(connect(
  mapStateToProps,
  { likeBlog, removeBlog }
)(BlogDetails))

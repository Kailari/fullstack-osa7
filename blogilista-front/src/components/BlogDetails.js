import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { likeBlog } from '../reducers/blogsReducer'
import CommentForm from '../components/CommentForm'

const BlogDetails = props => {
  const { target } = props

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

  return (
    <div className="blog details">
      <div className="back">
        <Link to="/blogs">{'<< back'}</Link>
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

export default connect(
  null,
  { likeBlog }
)(BlogDetails)
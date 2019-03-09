import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

const UserDetails = props => {
  const handleBack = event => {
    event.preventDefault()
    props.history.goBack()
  }

  return (
    <div className="user details">
      <div className="back">
        <a href="#" onClick={handleBack}>{'<< back'}</a>
      </div>
      <h2>{props.target.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {props.target.blogs.map(blog =>
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </li>
        )}
      </ul>
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
  null
)(UserDetails))

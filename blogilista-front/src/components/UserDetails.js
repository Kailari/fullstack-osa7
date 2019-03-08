import React from 'react'
import { connect } from 'react-redux'

const UserDetails = props => {
  return (
    <div>
      <h2>{props.target.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {props.target.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
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

export default connect(
  mapStateToProps,
  null
)(UserDetails)

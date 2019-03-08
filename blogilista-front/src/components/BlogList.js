import React, { useState } from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'

const BlogList = props => {
  const { blogs } = props
  const [visible, setVisible] = useState(null)

  return (
    <>
      <h2>blogs</h2>
      <div className="blog list">
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            visible={blog.id === visible}
            setVisible={setVisible} />
        )}
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs
  }
}

export default connect(
  mapStateToProps,
  null
)(BlogList)
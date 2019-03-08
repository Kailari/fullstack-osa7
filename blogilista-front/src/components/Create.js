import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { useField } from '../hooks'
import { createBlog } from '../reducers/blogsReducer'

const CreateForm = (props) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const handleCreate = (event) => {
    event.preventDefault()

    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    title.reset()
    author.reset()
    url.reset()
    props.createBlog(newBlog)
    props.history.push('/blogs')
  }

  return (
    <form onSubmit={handleCreate}>
      Title: <input name="Title" {...title} reset={undefined} /><br />
      Author: <input name="Author" {...author} reset={undefined} /><br />
      URL: <input name="URL" {...url} reset={undefined} /><br />
      <button type="submit">Create</button>
    </form>
  )
}

export default withRouter(connect(
  null,
  { createBlog }
)(CreateForm))
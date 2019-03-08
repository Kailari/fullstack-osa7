import React from 'react'
import { connect } from 'react-redux'

import { useField } from '../hooks'
import { addComment } from '../reducers/blogsReducer'

const CommentForm = (props) => {
  const content = useField('text')

  const handleComment = (event) => {
    event.preventDefault()

    props.addComment(props.blog, content.value)
    content.reset()
  }

  return (
    <form onSubmit={handleComment}>
      <input name="Comment" {...content} reset={undefined} /><br />
      <button type="submit">Add Comment</button>
    </form>
  )
}

export default connect(
  null,
  { addComment }
)(CommentForm)
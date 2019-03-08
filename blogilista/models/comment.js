const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const commentSchema = mongoose.Schema({
  content: {
    type: String,
    trim: true,
    required: [true, 'Comment contents missing!'],
    minlength: [3, 'Comment must be at least 3 characters long!']
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Comment', commentSchema)

import axios from 'axios'
const baseUrl = `${BACKEND_URL}/api/blogs`

let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const addComment = async (blog, comment) => {
  const config = {
    headers: { Authorization: token },
  }

  const newComment = {
    content: comment
  }

  const response = await axios.post(`${baseUrl}/${blog.id}/comments`, newComment, config)
  return response.data
}

const update = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

const remove = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }

  await axios.delete(`${baseUrl}/${blog.id}`, config)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export default { create, getAll, setToken, update, remove, addComment }
import { showNotification } from './notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'

const initializeUser = (callback) => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)

      dispatch({
        type: 'INIT_USER',
        data: user
      })
    }
    callback()
  }
}

const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username: username.value, password: password.value,
      })

      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogListUser', JSON.stringify(user)
      )
      dispatch(showNotification(`User '${username.value}' logged in`, 'ok'))

      username.reset()
      password.reset()
      dispatch({
        type: 'LOGIN',
        data: user
      })
    } catch (error) {
      dispatch(showNotification('Invalid username or password', 'error'))
    }
  }
}

const logout = () => {
  return async dispatch => {
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogListUser')

    dispatch(showNotification('User logged out', 'ok'))

    dispatch({
      type: 'LOGOUT',
      data: null
    })
  }
}

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_USER':
    case 'LOGIN':
    case 'LOGOUT':
      return action.data
    default:
      return state
  }
}

export default reducer
export { initializeUser, login, logout }

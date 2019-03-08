import userService from '../services/users'

const initializeUsers = callback => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
    callback()
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data
    default:
      return state
  }
}

export default reducer
export { initializeUsers }

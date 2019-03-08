const hiddenState = { message: '', type: '', visible: false }

let notificationTimeoutHandle

const showNotification = (message, type, timeout = 5000) => {
  return dispatch => {
    clearTimeout(notificationTimeoutHandle)
    dispatch({
      type: 'NOTIFICATION_SHOW',
      data: { message, type, visible: true }
    })

    notificationTimeoutHandle = setTimeout(() => dispatch(hideNotification()), timeout)
  }
}

const hideNotification = () => {
  return dispatch => {
    dispatch({
      type: 'NOTIFICATION_HIDE',
      data: {}
    })
  }
}

const reducer = (state = hiddenState, action) => {
  switch (action.type) {
    case 'NOTIFICATION_SHOW':
      return action.data
    case 'NOTIFICATION_HIDE':
      return hiddenState
    default:
      return state
  }
}

export default reducer
export {
  showNotification
}

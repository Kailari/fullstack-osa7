import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const { notification } = props

  return (
    <>
      {notification &&
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      }
    </>
  )
}

const parseNotification = notification => {
  return notification.visible
    ? { message: notification.message, type: notification.type }
    : null
}

const mapStateToProps = state => {
  return {
    notification: parseNotification(state.notification)
  }
}

export default connect(
  mapStateToProps,
  null
)(Notification)
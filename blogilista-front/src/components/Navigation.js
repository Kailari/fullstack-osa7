import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { logout } from '../reducers/loginReducer'

const Navigation = props => {
  const handleLogout = () => {
    props.logout()
    props.history.push('/')
  }

  const userInfo = () => (
    <span className="userInfo">
      Logged in as {props.user.username} <button name="Logout" onClick={handleLogout}>Logout</button>
    </span>
  )

  return (
    <div className="navigation">
      <Link className="link" to="/blogs">blogs</Link>
      <Link className="link" to="/create">create</Link>
      <Link className="link" to="/users">users</Link>
      {props.user && userInfo()}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default withRouter(connect(
  mapStateToProps,
  { logout }
)(Navigation))
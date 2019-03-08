import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/loginReducer'

const Navigation = props => {
  const userInfo = () => (
    <span className="userInfo">
      Logged in as {props.user.username} <button onClick={props.logout}>Logout</button>
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

export default connect(
  mapStateToProps,
  { logout }
)(Navigation)
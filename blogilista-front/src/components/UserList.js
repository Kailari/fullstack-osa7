import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = (props) => {
  return (
    <div className="user list">
      <h2>users</h2>
      <table>
        <tbody>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Blogs</th>
          </tr>
          {props.users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
              <td>{user.name}</td>
              <td className="count">{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

export default connect(
  mapStateToProps,
  null
)(UserList)
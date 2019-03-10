import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route, Redirect
} from 'react-router-dom'
import { connect } from 'react-redux'
import { useField } from './hooks'
import { showNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'
import { initializeUser, login, logout } from './reducers/loginReducer'

import Header from './components/Header'
import Footer from './components/Footer'
import Navigation from './components/Navigation'
import LoginForm from './components/Login'
import CreateForm from './components/Create'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import BlogDetails from './components/BlogDetails'
import UserList from './components/UserList'
import UserDetails from './components/UserDetails'

const App = (props) => {
  const { user } = props
  const [loaded, setLoaded] = useState(false)
  const username = useField('text')
  const password = useField('password')

  let loadStage = 3
  const nextLoadStage = (stage) => {
    loadStage--
    console.log(`loaded '${stage}' (${(3 - loadStage)}/3)`)
    if (loadStage === 0) {
      setLoaded(true)
    }
  }

  useEffect(() => {
    console.log('Initializing resources...')
    props.initializeBlogs(() => nextLoadStage('blogs'))
    props.initializeUsers(() => nextLoadStage('users'))
    props.initializeUser(() => nextLoadStage('login'))
  }, [])

  const loginForm = () => (
    <div className="login-form">
      <h2>Login</h2>
      <LoginForm
        login={() => props.login(username, password)}
        username={username}
        password={password} />
    </div>
  )

  const newBlogForm = () => (
    <div className="create-form">
      <h2>Add new blog</h2>
      <CreateForm />
    </div>
  )

  const ensureLogin = element => {
    if (!user) {
      props.showNotification('Please log in first', 'warn')
      return <Redirect to="/" />
    }

    return element
  }

  if (!loaded) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <Router>
      <div className="main container">
        <header>
          <Header />
          {user && <Navigation />}
          <Notification />
        </header>

        <section className="content-panel">
          <Route exact path="/" render={() =>
            user ? <Redirect to="/blogs" /> : loginForm()
          } />

          <Route exact path="/blogs" render={() =>
            ensureLogin(<BlogList />)
          } />

          <Route exact path="/blogs/:id" render={({ match }) => {
            const target = props.blogs.find(b => b.id === match.params.id)

            if (!target) {
              props.showNotification('Invalid blog ID', 'error')
              return <Redirect to="/blogs" />
            }

            return ensureLogin(<BlogDetails target={target} />)
          }
          } />

          <Route exact path="/create" render={() =>
            ensureLogin(newBlogForm())
          } />

          <Route exact path="/users" render={() =>
            ensureLogin(<UserList />)
          } />

          <Route exact path="/users/:id" render={({ match }) => {
            const target = props.users.find(u => u.id === match.params.id)

            if (!target) {
              props.showNotification('Invalid user ID', 'error')
              return <Redirect to="/users" />
            }

            return ensureLogin(<UserDetails target={target} />)
          }
          } />
        </section>
        <footer>
          <Footer />
        </footer>
      </div>
    </Router >
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
    users: state.users,
    blogs: state.blogs,
  }
}

export default connect(
  mapStateToProps,
  {
    showNotification, initializeBlogs,
    initializeUsers,
    initializeUser, login, logout
  }
)(App)

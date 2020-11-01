import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { store } from '../redux/store'
import { loginReqSuccess } from '../redux/auth/actions'
import LoginPage from './login'
import Profile from './profile'
import AllPosts from './posts'
import NewPost from './posts/new'
import Nav from './nav'
import PrivateRoute from './PrivateRoute'

class App extends Component {
  render () {
    // eslint-disable-next-line no-undef
    if (localStorage.getItem('token')) {
      // eslint-disable-next-line no-undef
      this.props.loginSuccess({ username: jwtDecode(localStorage.getItem('token')).username })
    }
    const { loggedIn } = this.props

    return (
      <div>
        <Router>
          {loggedIn ? <Nav /> : <div></div>}
          <Switch>
            <PrivateRoute exact path="/profile/posts/new">
              <NewPost />
            </PrivateRoute>
            <PrivateRoute exact path="/profile/posts/:post_title">
              <AllPosts />
            </PrivateRoute>
            <PrivateRoute exact path="/profile/posts">
              <AllPosts />
            </PrivateRoute>
            <PrivateRoute exact path="/profile">
              <Profile />
            </PrivateRoute>
            <Route exact path="/login">
              <LoginPage />
            </Route>
          </Switch>
        </Router>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.user.username,
    loggedIn: state.auth.loggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginSuccess: (user) => { dispatch(loginReqSuccess(user)) }
  }
}
const Application = connect(mapStateToProps, mapDispatchToProps)(App)

ReactDOM.render(
  <Provider store={store}>
    <Application />
  </Provider>, document.getElementById('root'))

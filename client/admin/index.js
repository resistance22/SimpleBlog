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
import Nav from './nav'
import PrivateRoute from './PrivateRoute'

class App extends Component {
  componentDidMount () {
    // eslint-disable-next-line no-undef
    if (localStorage.getItem('token')) {
      // eslint-disable-next-line no-undef
      this.props.loginSuccess({ username: jwtDecode(localStorage.getItem('token')).username })
    }
  }

  render () {
    const { loggedIn } = this.props
    return (
      <div>
        <Router>
          {loggedIn ? <Nav /> : <div></div>}
          <Switch>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <PrivateRoute exact path="/profile">
              <Profile />
            </PrivateRoute>
            <PrivateRoute exact path="/profile/posts">
              <AllPosts />
            </PrivateRoute>
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

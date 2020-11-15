/* eslint-disable no-undef */
import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import loadable from '@loadable/component'
import { Provider, connect } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { store } from '../redux/store'
import { ToastContainer } from 'react-toastify'
import { loginReqSuccess } from '../redux/auth/actions'
import { setAuthorizationHeader } from './utils'
import CircularProgress from '@material-ui/core/CircularProgress'
import PrivateRoute from './PrivateRoute'
import './admin.scss'
import './reactToastify.scss'

const NewPost = loadable(() => import('./posts/new'))
const AllPosts = loadable(() => import('./posts'))
const Nav = loadable(() => import('./nav'))
const Post = loadable(() => import('./posts/post'))
const Profile = loadable(() => import('./profile'))
const LoginPage = loadable(() => import('./login'))

class App extends Component {
  render () {
    if (localStorage.getItem('token')) {
      this.props.loginSuccess({ username: jwtDecode(localStorage.getItem('token')).username })
      setAuthorizationHeader(localStorage.getItem('token'))
    }
    const { loggedIn } = this.props

    return (
      <div className="admin-area">
        <Router>
          {loggedIn ? <Nav /> : <div></div>}
          <Switch>
            <PrivateRoute exact path="/profile/posts/new">
              <NewPost fallback={<CircularProgress color="secondary" />}/>
            </PrivateRoute>
            <PrivateRoute exact path="/profile/posts/:postID">
              <Post fallback={<CircularProgress color="secondary" />} />
            </PrivateRoute>
            <PrivateRoute exact path="/profile/posts">
              <AllPosts fallback={<CircularProgress color="secondary" />} />
            </PrivateRoute>
            <PrivateRoute exact path="/profile">
              <Profile fallback={<CircularProgress color="secondary" />} />
            </PrivateRoute>
            <Route exact path="/login">
              <LoginPage fallback={<CircularProgress color="secondary" />} />
            </Route>
          </Switch>
        </Router>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
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

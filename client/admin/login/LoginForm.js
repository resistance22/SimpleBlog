import React, { Component } from 'react'
import { post } from 'axios'
import { connect } from 'react-redux'
import { loginReqSuccess } from '../../redux/auth/actions'
import { Redirect } from 'react-router-dom'

import jwtDecode from 'jwt-decode'

class LoginForm extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: ''
    }
    this.onUsernameChange = this.onUsernameChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  onUsernameChange (e) {
    this.setState({
      ...this.state,
      username: e.target.value
    })
  }

  onPasswordChange (e) {
    this.setState({
      ...this.state,
      password: e.target.value
    })
  }

  onFormSubmit (e) {
    e.preventDefault()
    const { loginSuccess } = this.props
    post('/login', { ...this.state }).then((result) => {
      loginSuccess({ username: jwtDecode(result.data.token).username })
      // eslint-disable-next-line no-undef
      localStorage.setItem('token', result.data.token)
    }).catch((e) => {
    })
  }

  render () {
    const { loggedIn } = this.props
    if (loggedIn) {
      return (<Redirect to="/profile" />)
    } else {
      return (
        <form onSubmit={this.onFormSubmit} >
          <div className="email">
            <label htmlFor="username">Username:</label><br />
            <input onChange={this.onUsernameChange} autoComplete="username" type="text" name="username" id="username" />
          </div>
          <div className="password">
            <label htmlFor="password">password:</label><br />
            <input onChange={this.onPasswordChange} type="password" autoComplete="current-password" name="password" id="password" />
          </div>
          <div>
            <input type="submit" value="Submit"></input>
          </div>
        </form>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    loggedIn: state.auth.loggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginSuccess: (user) => { dispatch(loginReqSuccess(user)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)

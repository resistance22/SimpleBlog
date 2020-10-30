import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../../redux/auth/actions'

class Profile extends Component {
  constructor () {
    super()

    this.logoutClick = this.logoutClick.bind(this)
  }

  logoutClick (e) {
    e.preventDefault()
    const { logout } = this.props
    logout()
    // eslint-disable-next-line no-undef
    localStorage.removeItem('token')
  }

  render () {
    const { username } = this.props
    return (
      <div>
        <h1>Welcom {username}</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.user.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

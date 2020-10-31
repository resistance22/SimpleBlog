
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
function PrivateRoute ({ component: Component, loggedIn, ...rest }) {
  return (<Route
    {...rest}
    render={props =>
      loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />)
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.user.username,
    loggedIn: state.auth.loggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)

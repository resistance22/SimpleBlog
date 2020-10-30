
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
function PrivateRoute ({ children, ...rest }) {
  const { loggedIn } = rest
  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  )
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
import React, { Component } from 'react'
import { connect } from 'react-redux'
class AllPosts extends Component {
  render () {
    return (
      <div>
        <div>posts</div>
        <div>posts</div>
        <div>posts</div>
        <div>posts</div>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllPosts)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostItem from './PostItem'
import axios from 'axios'
class AllPosts extends Component {
  constructor () {
    super()
    this.state = {
      loaded: false,
      posts: []
    }
  }

  componentDidMount () {
    axios.get('/posts').then(res => {
      this.setState({
        ...this.state,
        loaded: true,
        posts: res.data.posts
      })
      console.log(res.data.posts)
    })
  }

  render () {
    if (this.state.loaded) {
      return (
        <div className="post-list">
          {this.state.posts.map((post, i) => {
            return (<div key={i}><PostItem title={post.title} id={post.id} /></div>)
          })}
        </div>
      )
    } else {
      return (
        <div>
          ...loading
        </div>
      )
    }
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

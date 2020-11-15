import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class PostItem extends Component {
  render () {
    const { id, title } = this.props
    return (
      <div className="post">
        <Link to={`posts/${id}`} >
          {title}
        </Link>
      </div>
    )
  }
}

export default PostItem

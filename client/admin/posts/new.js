import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'

class NewPost extends Component {
  constructor () {
    super()
    this.state = {
      validTitle: false,
      title: ''
    }

    this.setTitle = this.setTitle.bind(this)
  }

  setTitle (e) {

  }

  render () {
    return (
      <form>
        <TextField onChange={this.setTitle} id="outlined-basic" label="Title" />
      </form>
    )
  }
}

export default NewPost

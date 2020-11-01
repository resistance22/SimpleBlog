import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import './new.scss'
import Switch from '@material-ui/core/Switch'
import ReactMarkdown from '../../inc/ReactMarkdown'

class NewPost extends Component {
  constructor () {
    super()
    this.state = {
      validTitle: true,
      title: '',
      checkingTitle: false,
      body: 'Write Here...',
      showingReview: false,
      reviewMode: false
    }

    this.setTitle = this.setTitle.bind(this)
    this.validateTitle = this.validateTitle.bind(this)
    this.setBody = this.setBody.bind(this)
    this.onReviewToggle = this.onReviewToggle.bind(this)
  }

  setTitle (e) {
    this.setState({
      ...this.state,
      title: e.target.value
    })
  }

  setBody (e) {
    this.setState({
      ...this.state,
      body: e.target.value
    })
  }

  validateTitle (e) {
    this.setState({
      ...this.state,
      checkingTitle: true
    })
    if (!e.target.value) {
      this.setState({
        ...this.state,
        validTitle: false,
        checkingTitle: false
      })
    } else {
      const title = encodeURI(this.state.title.replace(/ /g, '-'))
      axios.get(`/posts/exists/${title}`).then(res => {
        this.setState({
          ...this.state,
          validTitle: !res.data.result,
          checkingTitle: false
        })
      }).catch(e => {
        console.log(e)
      })
    }
  }

  onReviewToggle (e) {
    this.setState({
      ...this.state,
      reviewMode: !this.state.reviewMode
    })
  }

  submit (e) {
    e.preventDefault()
  }

  render () {
    return (
      <form onSubmit={this.submit} id="new-post">
        <div className="new-post-container">
          <div className="main-section">
            <div className="main-inner">

              <div className="post-title-container">
                <TextField
                  error={!this.state.validTitle}
                  className="post-title"
                  onChange={this.setTitle}
                  onBlur={this.validateTitle}
                  value={this.state.title}
                  disabled={this.state.checkingTitle}
                  id="outlined-basic"
                  label="Title"
                  helperText="Title must be unique"
                  required
                />
              </div>
              {
                this.state.reviewMode ? (
                  <div className="content">
                    <ReactMarkdown string={this.state.body} />
                  </div>
                ) : (
                  <div className="post-body-container">
                    <textarea value={this.state.body} onChange={this.setBody} id="post-body">
                    </textarea>
                  </div>
                )
              }
            </div>
          </div>
          <div className="sidebar">
            <div className="sidebar-inner">
              <div className="preview-toggle">
                <label className="switchLabel">
                  Preview
                </label>
                <Switch
                  checked={this.state.reviewMode}
                  onChange={this.onReviewToggle}
                  name="checkedA"
                />
              </div>
            </div>
          </div>
        </div>

      </form>
    )
  }
}

export default NewPost

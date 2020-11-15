import React, { Component } from 'react'
import { connect } from 'react-redux'
import { startLoading, finishLoading } from '../../redux/adminPanel/actions'
import { toast } from 'react-toastify'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import './new.scss'
import Switch from '@material-ui/core/Switch'
import ReactMarkdown from '../../inc/ReactMarkdown'
import Chip from '@material-ui/core/Chip'
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router-dom'

class Post extends Component {
  constructor () {
    super()
    this.state = {
      validTitle: true,
      title: '',
      checkingTitle: false,
      body: '',
      showingReview: false,
      reviewMode: false,
      tags: [],
      tagText: '',
      submited: true,
      submitting: false,
      loaded: false,
      id: ''
    }

    this.submit = this.submit.bind(this)
    this.setTitle = this.setTitle.bind(this)
    this.validateTitle = this.validateTitle.bind(this)
    this.setBody = this.setBody.bind(this)
    this.onReviewToggle = this.onReviewToggle.bind(this)
    this.handleChipDeletion = this.handleChipDeletion.bind(this)
    this.tagTextChange = this.tagTextChange.bind(this)
    this.insertTags = this.insertTags.bind(this)
  }

  componentDidMount () {
    const { postID } = this.props.match.params
    axios.get(`/posts/${postID}`).then(res => {
      const { title, body, tags } = res.data.post
      console.log(res.data)
      this.setState({
        ...this.state,
        loaded: true,
        title: title,
        body: body,
        tags: tags,
        id: postID
      })
    })
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
    const { startLoading, username, finishLoading } = this.props
    const { validTitle, title, body, tags, id } = this.state
    if (validTitle) {
      startLoading()
      this.setState({
        ...this.state,
        submitting: true
      })
      axios.put('/posts', {
        title: title,
        body: body,
        tags: tags,
        author: username,
        published: true,
        id: id
      }).then(res => {
        if (res.data.success) {
          finishLoading()
          this.setState({
            ...this.state,
            submitting: false,
            submited: true,
            id: res.data.id
          })
        }
      })
    } else {
      toast.error('Please Enter A Valid Title!', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
    }
  }

  handleChipDeletion (label) {
    return (e) => {
      e.preventDefault()
      this.setState({
        ...this.state,
        tags: this.state.tags.filter(item => item !== label)
      })
    }
  }

  tagTextChange (e) {
    this.setState({
      ...this.state,
      tagText: e.target.value
    })
  }

  insertTags (e) {
    if (!this.state.tagText) { return }
    if ((e && e.type === 'keydown' && e.key === 'Enter') || (e.type === 'click')) {
      const tags = this.state.tagText.split(',')
      this.setState({
        ...this.state,
        tagText: '',
        tags: [...new Set([...this.state.tags, ...tags])]
      })
    }
  }

  render () {
    return (
      <form onSubmit={this.submit} id="new-post">
        <div className={`new-post-container ${(this.state.submitting || !this.state.loaded) && ('disabled')}`}>
          <div className="main-section">
            <div className="main-inner">

              <div className="post-title-container">
                <TextField
                  error={!this.state.validTitle}
                  className="post-title"
                  onChange={this.setTitle}
                  value={this.state.title}
                  disabled={this.state.checkingTitle}
                  id="outlined-basic"
                  label="Title"
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
              <div className="tags">
                <h3 className="tags-title">
                  Tags
                </h3>
                <div className="tag-input">
                  <TextField
                    id="tag-input"
                    label="Add Tag"
                    helperText="Seperate Tags by comma"
                    onChange={this.tagTextChange}
                    value={this.state.tagText}
                    onKeyDown={this.insertTags}
                  />
                  <Button onClick={this.insertTags} variant="contained" color="secondary">
                    Add Tags
                  </Button>
                </div>
                <ul className="tag-list">
                  {this.state.tags.map((item, index) => (<li key={index} ><Chip label={item} onDelete={this.handleChipDeletion(item)} /></li>))}
                </ul>
              </div>
              <div className="submit-button">
                <Button onClick={this.submit} variant="contained" color="secondary">
                  {this.state.submited ? 'Update' : 'Submit'}
                </Button>
              </div>
            </div>
          </div>
        </div>

      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    drawerOpen: state.adminPanel.drawerOpen,
    loading: state.adminPanel.loading,
    username: state.auth.user.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startLoading: () => dispatch(startLoading()),
    finishLoading: () => dispatch(finishLoading())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Post))

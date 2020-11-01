import React, { Component } from 'react'
import MarkdownIt from 'markdown-it'

class ReactMarkdown extends Component {
  constructor () {
    super()
    this.state = {
      body: '',
      bodyParsed: false
    }
  }

  componentDidMount () {
    const { string } = this.props
    const body = new MarkdownIt().render(string)
    this.setState({
      ...this.state,
      body: body,
      bodyParsed: true
    })
  }

  render () {
    return (
      <div>
        {
          !this.state.bodyParsed ? (
            <p>...parsing</p>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: this.state.body }} />
          )
        }
      </div>
    )
  }
}

export default ReactMarkdown

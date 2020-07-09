import React from 'react'
import ReactMarkdown from 'react-markdown'
import Textfit from 'react-textfit'
import useFitText from 'use-fit-text'

function createMarkup(text) {
  return { __html: text }
}

const TextLayout = (props) => {
  const { fontSize, ref } = useFitText()

  return (
    <div className="text" style={props.style}>
      <small>
        <i>{props.title}</i>
      </small>
      <div ref={ref} dangerouslySetInnerHTML={createMarkup(props.content)} />
      <small>added by {props.author}</small>
    </div>
  )
}

export default TextLayout

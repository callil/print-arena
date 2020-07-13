import React from 'react'

function createMarkup(text) {
  return { __html: text }
}

const TextLayout = (props) => {
  return (
    <div className="text" style={props.style}>
      {/* <small>
        <i>{props.title}</i>
      </small> */}
      <h1>{props.title}</h1>
      <div dangerouslySetInnerHTML={createMarkup(props.content)} />
      <div dangerouslySetInnerHTML={createMarkup(props.description)} />
      <div className="author {props.author}"><b>— defined by {props.author} {props.authorid}</b></div>
    </div>
  )
}

export default TextLayout

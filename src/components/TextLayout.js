import React from 'react'

function createMarkup(text) {
  return { __html: text }
}

const TextLayout = (props) => {
  return (
    <div className={"text author" + props.authorid} style={props.style}>
      {/* <small>
        <i>{props.title}</i>
      </small> */}
      <h1>{props.title}</h1>
      <div className="authorstyle" dangerouslySetInnerHTML={createMarkup(props.content)} />
      <div className="authorstyle" dangerouslySetInnerHTML={createMarkup(props.description)} />
      <div className="author"><b>— defined by {props.author} {props.authorid}</b></div>
    </div>
  )
}

export default TextLayout

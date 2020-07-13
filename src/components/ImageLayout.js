import React from 'react'

function createMarkup(text) {
  return { __html: text }
}

const ImageLayout = (props) => (
  <div className="image" style={props.style}>
    {/* <small>
      <i>{props.title}</i>
    </small> */}

    <h1>{props.title}</h1>
    <br />
    <img alt="" className="to-print" src={props.url} />
    <br />

    <small dangerouslySetInnerHTML={createMarkup(props.description)} />

    <div className="author"><b>— defined by {props.author}</b></div>
  </div>
)

export default ImageLayout

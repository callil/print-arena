import React from 'react'

const ImageLayout = (props) => (
  <div className="image" style={props.style}>
    <small>
      <i>{props.title}</i>
    </small>
    <br />
    <img alt="" className="to-print" src={props.url} />
    <br />
    <small>added by {props.author}</small>
  </div>
)

export default ImageLayout

import React from 'react'

const ImageLayout = (props) => (
  <div className="image" style={props.style}>
    {/* <small>
      <i>{props.title}</i>
    </small> */}

    <h1>{props.title}</h1>
    <br />
    <img alt="" className="to-print" src={props.url} />
    <br />
    <small>added by {props.author}</small>
  </div>
)

export default ImageLayout

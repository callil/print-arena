import React from 'react'

function createMarkup(text) {
  return { __html: text }
}

const ImageLayout = (props) => (
  <div className={"image author" + props.authorid} style={props.style}>
    {/* <small>
      <i>{props.title}</i>
    </small> */}

    <h1>{props.title}</h1>
    <br />
    <img alt="" className="to-print" src={props.url} />
    <br />

    <div className="authorstyle description" dangerouslySetInnerHTML={createMarkup(props.description)} />




    <div className="author"><b>— added by {props.author} {props.authorid} */}</b></div>
  </div>
)

export default ImageLayout

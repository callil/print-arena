import React from 'react';
import ReactMarkdown from 'react-markdown'
import Textfit from 'react-textfit';

const TextLayout = (props) => (
  <div className='text' style={props.style} >
    <Textfit className={"fit"} mode="multi">
      <ReactMarkdown style={{width: '100%'}} source={props.content} />
    </Textfit>
  </div>
);

export default TextLayout

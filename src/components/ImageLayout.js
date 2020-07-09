import React from 'react';

const ImageLayout = (props) => (
  <div className='image' style={props.style}>
    <img alt='' className='to-print' src={props.url}/>
    {/* <div className='itemText'> */}

    {/* <p className='imageTitle'>{props.title}</p> */}
    {/* <a href="src" className='desc'>{"are.na/block/" + props.id}</a> */}
    {/* </div> */}
  </div>
);

export default ImageLayout

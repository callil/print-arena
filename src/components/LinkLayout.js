import React from 'react';

const LinkLayout = (props) => (
  <div className='image' style={props.style}>
    <img src={props.image} alt='' />
    <div className='itemText'>
      {/* <p className='imageTitle'>{'http://are.na/block/' + this.props.id}</p> */}
      {/* <p className='imageTitle'>{this.props.title}</p>
      <a href="src" className='desc'>{this.props.url}</a> */}
    </div>
  </div>
);

export default LinkLayout

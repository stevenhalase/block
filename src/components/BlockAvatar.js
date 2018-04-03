import React, { Component } from 'react';

const style = {
  borderRadius: '50%',
  height: '35px',
  width: '35px',
  overflow: 'hidden',
  backgroundColor: '#e9ebee',
  border: '1px solid #cdd2d4'
}

const imageStyle = {
  borderRadius: '50%',
  height: '35px',
  width: '35px'
}

class BlockAvatar extends Component {
  render() {
    return (
      <div className="BlockAvatar" style={style}>
        <img src={this.props.imagesrc} style={imageStyle} />
      </div>
    );
  }
}

export default BlockAvatar;

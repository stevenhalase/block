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
  borderRadius: '50%'
}

class BlockAvatar extends Component {
  render() {
    let size = this.props.size ? this.props.size : 35;
    let propSize = {
      height: size + 'px',
      width: size + 'px'
    }
    let combinedStyle = Object.assign({}, style, propSize);
    return (
      <div className="BlockAvatar" style={combinedStyle}>
        <img src={this.props.imagesrc} style={imageStyle} height={size} width={size} />
      </div>
    );
  }
}

export default BlockAvatar;

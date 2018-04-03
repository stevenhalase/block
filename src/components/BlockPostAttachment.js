import React, { Component } from 'react';

const style = {
  width: '100%'
}

const imageStyle = {
  width: '100%',
  minHeight: '200px',
  maxHeight: '300px'
}

class BlockPostAttachment extends Component {
  render() {
    return (
      <div className="BlockPostAttachment" style={style}>
        <img src={this.props.post.attachment} style={imageStyle} />
      </div>
    );
  }
}

export default BlockPostAttachment;

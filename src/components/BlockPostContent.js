import React, { Component } from 'react';

const style = {
  width: '100%',
  display: 'flex',
  padding: '15px',
  fontWeight: '300',
  flex: '1'
}

class BlockPostContent extends Component {
  render() {
    return (
      <div className="BlockPostContent" style={style}>
        <p>{this.props.post.content}</p>
      </div>
    );
  }
}

export default BlockPostContent;

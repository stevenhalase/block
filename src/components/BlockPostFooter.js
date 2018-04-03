import React, { Component } from 'react';

const style = {
  width: '100%',
  padding: '10px',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  borderTop: '1px solid #e9ebee'
}

class BlockPostFooter extends Component {
  render() {
    var postDate = new Date(this.props.post.date).toLocaleString();
    return (
      <div className="BlockPostFooter" style={style}>
        <p style={{fontWeight: '200', fontSize: '12px', padding: '0'}}>{postDate}</p>
      </div>
    );
  }
}

export default BlockPostFooter;

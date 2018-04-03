import React, { Component } from 'react';
import BlockAvatar from './BlockAvatar';

const style = {
  width: '100%',
  height: '50px',
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  borderBottom: '1px solid #e9ebee'
}

class BlockPostHeader extends Component {
  render() {
    return (
      <div className="BlockPostHeader" style={style}>
        <BlockAvatar imagesrc={this.props.post.picture}/>
        <h5 style={{fontWeight: '300'}}>{this.props.post.username}</h5>
      </div>
    );
  }
}

export default BlockPostHeader;

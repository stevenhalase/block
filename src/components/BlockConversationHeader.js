import React, { Component } from 'react';
import BlockAvatar from './BlockAvatar';

const style = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  fontSize: '12px',
  borderRadius: '4px 4px 0 0',
  borderBottom: '1px solid rgb(233, 235, 238)',
  color: '#716DF9',
  cursor: 'pointer'
}

const nameContainer = {
  marginLeft: '5px',
  fontSize: '12px',
}

class BlockConversationListHeader extends Component {
  render() {
    return (
      <div className="BlockConversationListHeader" style={style} onClick={this.props.toggleexpand}>
        <BlockAvatar imagesrc={'https://robohash.org/fugitcorruptiexercitationem.bmp?size=50x50&set=set1'} size={15} />
        <div style={nameContainer}>{this.props.person.name}</div>
      </div>
    );
  }
}

export default BlockConversationListHeader;

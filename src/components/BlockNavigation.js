import React, { Component } from 'react';
import BlockMainNavigation from './BlockMainNavigation';
import BlockSubNavigation from './BlockSubNavigation';

const style = {
  width: '768px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '4px',
  boxShadow: '1px 3px 3px rgba(0,0,0,0.1)'
}

class BlockNavigation extends Component {
  render() {
    return (
      <div className="BlockNavigation" style={style}>
        <BlockMainNavigation />
        <BlockSubNavigation 
          locationservice={this.props.locationservice} />
      </div>
    );
  }
}

export default BlockNavigation;

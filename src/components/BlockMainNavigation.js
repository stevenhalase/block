import React, { Component } from 'react';
import BlockLogo from './BlockLogo';
import BlockNotifications from './BlockNotifications';
import BlockContacts from './BlockContacts';
import BlockMessages from './BlockMessages';

const style = {
  height: '50px',
  width: '100%',
  borderRadius: '4px 4px 0 0',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: '#716DF9'
}

const navElStyle = {
  padding: '0 25px',
  borderRight: '1px solid #4931A8'
}

class BlockMainNavigation extends Component {
  render() {
    return (
      <div className="BlockMainNavigation" style={style}>
        <div style={navElStyle}>
          <BlockLogo />
        </div>
        <div style={navElStyle}>
          <BlockNotifications style={navElStyle} />
        </div>
        <div style={navElStyle}>
          <BlockContacts style={navElStyle} />
        </div>
        <div style={navElStyle}>
          <BlockMessages style={navElStyle} />
        </div>
      </div>
    );
  }
}

export default BlockMainNavigation;

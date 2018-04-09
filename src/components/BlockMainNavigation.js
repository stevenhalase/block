import React, { Component } from 'react';
import BlockLogo from './BlockLogo';
import BlockNotifications from './BlockNotifications';
import BlockContacts from './BlockContacts';
import BlockMessages from './BlockMessages';
import BlockUser from './BlockUser';

const style = {
  height: '50px',
  width: '100%',
  borderRadius: '4px 4px 0 0',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: '#716DF9'
}

const navLeft = {
  flex: '0 0 40%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center'
}

const navRight = {
  flex: '0 0 60%',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center'
}

const navElStyle = {
  padding: '0 25px',
  // borderRight: '1px solid #4931A8'
}

const navElNoBorderStyle = {
  padding: '0 25px'
}

class BlockMainNavigation extends Component {
  render() {
    return (
      <div className="BlockMainNavigation" style={style}>
        <div style={navLeft}>
          <div style={navElStyle}>
            <BlockLogo />
          </div>
          <div style={navElStyle}>
            <BlockNotifications 
              user={this.props.user}
              apiservice={this.props.apiservice}
              showalert={this.props.showalert}
              getuserupdate={this.props.getuserupdate} />
          </div>
          {/* <div style={navElStyle}>
            <BlockContacts style={navElStyle} />
          </div>
          <div style={navElStyle}>
            <BlockMessages style={navElStyle} />
          </div> */}
        </div>
        <div style={navRight}>
          <div style={navElNoBorderStyle}>
            <BlockUser 
              user={this.props.user}
              userlogout={this.props.userlogout} />
          </div>
        </div>
      </div>
    );
  }
}

export default BlockMainNavigation;

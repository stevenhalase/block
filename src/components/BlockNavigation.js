import React, { Component } from 'react';
import BlockMainNavigation from './BlockMainNavigation';
import BlockSubNavigation from './BlockSubNavigation';

const style = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '4px',
  boxShadow: '1px 3px 3px rgba(0,0,0,0.1)',
}

class BlockNavigation extends Component {
  render() {
    return (
      <div className="BlockNavigation" style={style}>
        <BlockMainNavigation 
          user={this.props.user}
          userlogout={this.props.userlogout}
          apiservice={this.props.apiservice}
          showalert={this.props.showalert}
          getuserupdate={this.props.getuserupdate} />
        <BlockSubNavigation 
          locationservice={this.props.locationservice} />
      </div>
    );
  }
}

export default BlockNavigation;

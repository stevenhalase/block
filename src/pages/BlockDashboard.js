import React, { Component } from 'react';
import BlockNavigation from '../components/BlockNavigation';
import BlockFeed from '../components/BlockFeed';

const style = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}

const navWrapperStyle = {
  position: 'fixed',
  top: '0',
  borderTop: '25px solid #dfe6e9',
  borderBottom: '25px solid #dfe6e9'
}

const feedWrapperStyle = {
  marginTop: '125px'
}

class BlockDashboard extends Component {
  render() {
    return (
      <div className="BlockDashboard" style={style}>
        <div style={navWrapperStyle}>
          <BlockNavigation 
          apiservice={this.props.apiservice}
          locationservice={this.props.locationservice} />
        </div>
        <div style={feedWrapperStyle}>
          <BlockFeed apiservice={this.props.apiservice}/>
        </div>
      </div>
    );
  }
}

export default BlockDashboard;

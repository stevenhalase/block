import React, { Component } from 'react';
import BlockDistanceControls from './BlockDistanceControls';

const style = {
  height: '35px',
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  borderRadius: '0 0 4px 4px',
  backgroundColor: '#FFFFFF'
}

const navElStyle = {
  padding: '0 25px',
}

const navElStyleSelected = {

}

class BlockSubNavigation extends Component {
  render() {
    return (
      <div className="BlockSubNavigation" style={style}>
        <div style={navElStyle}>
          <BlockDistanceControls 
            locationservice={this.props.locationservice} />
        </div>
      </div>
    );
  }
}

export default BlockSubNavigation;

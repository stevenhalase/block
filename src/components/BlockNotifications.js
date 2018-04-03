import React, { Component } from 'react';
import Ionicon from 'react-ionicons'

const style = {
  
}

class BlockNotifications extends Component {
  render() {
    return (
      <div className="BlockNotifications" style={style}>
          <Ionicon icon="ios-notifications-outline" color="#FFFFFF" fontSize="24px" />
      </div>
    );
  }
}

export default BlockNotifications;

import React, { Component } from 'react';
import Ionicon from 'react-ionicons'

const style = {
  
}

class BlockMessages extends Component {
  render() {
    return (
      <div className="BlockMessages" style={style}>
          <Ionicon icon="ios-chatboxes-outline" color="#FFFFFF" fontSize="24px" />
      </div>
    );
  }
}

export default BlockMessages;
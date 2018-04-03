import React, { Component } from 'react';
import Ionicon from 'react-ionicons';

const style = {
  color: '#716DF9',
  flex: '0 0 100%',
  margin: '0 5px 5px',
  display: 'flex',
  cursor: 'pointer',
  fontSize: '12px'
}

const dateStyle = {
  display: 'flex',
  alignItems: 'center',
  marginRight: '5px'
}

class BlockFeedControls extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="BlockFeedControls" style={style} onClick={this.props.handledatetoggle}>
        <span style={dateStyle}>
          Date
        </span>
        <Ionicon 
          icon={this.props.descending ? 'ios-arrow-down' : 'ios-arrow-up'} 
          color="#716DF9" 
          fontSize="16px" />
      </div>
    );
  }
}

export default BlockFeedControls;
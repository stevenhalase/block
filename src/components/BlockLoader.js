import React, { Component } from 'react';

const openStyle = {
  position: 'fixed',
  display: 'flex',
  left: '0',
  top: '0',
  width: '100vw',
  height: '100vh',
  zIndex: '1000',
  backgroundColor: 'rgba(0,0,0,0.8)'
}

const closedStyle = {
  display: 'none'
}

const loaderStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  zIndex: '1001'
}

const messageStyle = {
  color: '#716DF9',
  fontWeight: '300'
}

class BlockLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: 'Loading...'
    }
    
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }
  render() {
    return (
      <div className="BlockLoader" style={this.state.open ? openStyle : closedStyle}>
        <div style={loaderStyle}>
          <div className="sk-folding-cube">
            <div className="sk-cube1 sk-cube"></div>
            <div className="sk-cube2 sk-cube"></div>
            <div className="sk-cube4 sk-cube"></div>
            <div className="sk-cube3 sk-cube"></div>
          </div>
          <span style={messageStyle}>{this.state.message}</span>
        </div>
      </div>
    );
  }
  open(message) {
    this.setState({ open: true, message: message });
  }
  close() {
    this.setState({ open: false, message: 'Loading...' });
  }
}

export default BlockLoader;

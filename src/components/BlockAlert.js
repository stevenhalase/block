import React, { Component } from 'react';

const openStyle = {
  position: 'fixed',
  display: 'flex',
  left: '50%',
  top: '15px',
  transform: 'translateX(-50%',
  zIndex: '1000',
  backgroundColor: '#716DF9',
  color: '#FFF',
  padding: '15px',
  borderRadius: '4px',
  fontSize: '12px',
}

const closedStyle = {
  display: 'none'
}

class BlockAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: '',
      timeout: null
    }
    
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }
  render() {
    return (
      <div className="BlockAlert" style={this.state.open ? openStyle : closedStyle}>
        {this.state.message}
      </div>
    );
  }
  open(message) {
    clearTimeout(this.state.timeout);
    let timeout = setTimeout(() => {
      this.close();
    }, 3000);
    this.setState({ open: true, message: message, timeout: timeout });
    
  }
  close() {
    clearTimeout(this.state.timeout);
    this.setState({ open: false, message: '', timeout: null });
  }
}

export default BlockAlert;

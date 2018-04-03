import React, { Component } from 'react';

const style = {
  color: '#FFF'
}

const logoStyle = {
  fontSize: '24px',
  fontWeight: '200'
}

class BlockLogo extends Component {
  render() {
    return (
      <div className="BlockLogo" style={style}>
        <h2 style={logoStyle}>BLOCK</h2>
      </div>
    );
  }
}

export default BlockLogo;

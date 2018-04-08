import React, { Component } from 'react';

const lightStyle = {
  color: '#FFF'
}

const darkStyle = {
  color: '#716DF9'
}

const logoStyle = {
  fontSize: '24px',
  fontWeight: '200'
}

class BlockLogo extends Component {
  render() {
    return (
      <div className="BlockLogo" style={this.props.dark ? darkStyle : lightStyle}>
        <h2 style={logoStyle}>BLOCK</h2>
      </div>
    );
  }
}

export default BlockLogo;

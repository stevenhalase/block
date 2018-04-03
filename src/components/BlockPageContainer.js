import React, { Component } from 'react';

const style = {
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  overflowY: 'auto'
}

class BlockPageContainer extends Component {
  render() {
    return (
      <div className="BlockPageContainer" style={style}>
        {this.props.children}
      </div>
    );
  }
}

export default BlockPageContainer;

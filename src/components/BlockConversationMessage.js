import React, { Component } from 'react';

const incomingMessageContainer= {
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start'
}

const outgoingMessageContainer = {
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end'
}

const incomingStyle = {
  backgroundColor: '#dfe6e9',
  margin: '5px',
  maxWidth: '80%',
  borderRadius: '4px',
  padding: '5px',
  fontSize: '12px'
}

const outgoingStyle = {
  backgroundColor: '#716DF9',
  color: '#FFF',
  margin: '5px',
  maxWidth: '80%',
  borderRadius: '4px',
  padding: '5px',
  fontSize: '12px'
}

class BlockConversationMessage extends Component {
  render() {
    return (
      <div className="BlockConversationMessage">
        <div style={this.props.incoming ? incomingMessageContainer : outgoingMessageContainer}>
          <div style={this.props.incoming ? incomingStyle : outgoingStyle}>{this.props.message}</div>
        </div>
      </div>
    );
  }
}

export default BlockConversationMessage;

import React, { Component } from 'react';
import BlockAvatar from './BlockAvatar';
import Ionicon from 'react-ionicons'

const style = {
  display: 'flex',
  width: '100%',
  overflow: 'hidden'
}

const input = {
  flex: '0 0 80%',
  padding: '10px',
  fontFamily: "'Roboto', sans-serif",
  lineHeight: '1.5',
  overflow: 'hidden'
}

const sendButton = {
  flex: '0 0 20%',
  backgroundColor: '#716DF9',
  color: '#FFF',
  border: 'none',
  padding: '10px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center'
}

class BlockConversationMessageEntry extends Component {
  render() {
    return (
      <div className="BlockConversationMessageEntry" style={style}>
        <input rows="1" id="message-entry-input" placeholder="Write something..." style={input}></input>
        <button type="submit" style={sendButton}>
          <Ionicon icon="ios-send-outline" color="#FFFFFF" fontSize="24px" />
        </button>
      </div>
    );
  }
}

export default BlockConversationMessageEntry;

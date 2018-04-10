import React, { Component } from 'react';
import BlockAvatar from './BlockAvatar';
import Ionicon from 'react-ionicons'

const style = {
  display: 'flex',
  width: '100%',
  overflow: 'hidden',
  borderTop: '1px solid rgb(233, 235, 238)',
}

const input = {
  flex: '0 0 80%',
  padding: '10px',
  fontFamily: "'Roboto', sans-serif",
  lineHeight: '1.5',
  overflow: 'hidden',
  border: 'none'
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
  constructor(props) {
    super(props);

    this.validate = this.validate.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }
  render() {
    return (
      <div className="BlockConversationMessageEntry" style={style}>
        <input rows="1" id="message-entry-input" placeholder="Write something..." style={input}></input>
        <button type="submit" style={sendButton} onClick={this.validate}>
          <Ionicon icon="ios-send-outline" color="#FFFFFF" fontSize="24px" />
        </button>
      </div>
    );
  }
  validate() {
    let input = document.getElementById('message-entry-input');
    let messageContent = input.value;
    if (messageContent.length) {
      this.sendMessage(messageContent);
    }
  }
  sendMessage(messageContent) {
    let message = {
      ConversationId: this.props.conversation.Id,
      From: this.props.user,
      To: this.props.conversation.To,
      Message: messageContent,
      Sent: new Date()
    }
    this.props.sendmessage(message);
  }
}

export default BlockConversationMessageEntry;

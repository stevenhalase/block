import React, { Component } from 'react';
import BlockConversationMessage from './BlockConversationMessage';
import BlockConversationListHeader from './BlockConversationHeader';
import BlockConversationMessageEntry from './BlockConversationMessageEntry';

const style = {
  position: 'fixed',
  bottom: '0',
  right: '315px',
  width: '250px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#FFF',
  borderRadius: '4px 4px 0 0',
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px -2px 3px 2px'
}

const messagesContainer = {
  height: '400px',
  display: 'flex',
  flexDirection: 'column',
  jusifyContent: 'center',
  padding: '15px'
}

class BlockConversation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }

    this.toggleExpand = this.toggleExpand.bind(this);
  }
  render() {
    if (this.state.expanded) {
      return (
        <div className="BlockConversation" style={style} onClick={this.props.toggleexpand}>
          <BlockConversationListHeader toggleexpand={this.toggleExpand} person={this.props.conversation.to} />
          <div style={messagesContainer}>
            {this.props.conversation.messages.map((message, i) => {
              return (
                <BlockConversationMessage incoming={i%2===0} message={message.message} key={i} />
              )
            })}
          </div>
          <BlockConversationMessageEntry />
        </div>
      );
    } else {
      return (
        <div className="BlockConversation" style={style} onClick={this.props.toggleexpand}>
          <BlockConversationListHeader toggleexpand={this.toggleExpand} person={this.props.conversation.to} />
        </div>
      );
    }
  }
  toggleExpand() {
    this.setState({ expanded: !this.state.expanded });
  }
}

export default BlockConversation;

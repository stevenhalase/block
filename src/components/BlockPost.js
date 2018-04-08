import React, { Component } from 'react';
import BlockPostHeader from './BlockPostHeader';
import BlockPostContent from './BlockPostContent';
import BlockPostAttachment from './BlockPostAttachment';
import BlockPostFooter from './BlockPostFooter';

const style = {
  flex: '1 1 calc(50% - 10px)',
  boxSizing: 'border-box',
  margin: '5px',
  backgroundColor: '#FFFFFF',
  border: '1px solid #e9ebee',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '4px',
  boxShadow: '1px 3px 3px rgba(0,0,0,0.1)'
}

class BlockPost extends Component {
  render() {
    if (this.props.post.attachment) {
      return (
        <div className="BlockPost" style={style}>
          <BlockPostHeader post={this.props.post} />
          <BlockPostAttachment post={this.props.post} />
          <BlockPostContent post={this.props.post} />
          <BlockPostFooter post={this.props.post} />
        </div>
      );
    } else {
      return (
        <div className="BlockPost" style={style}>
          <BlockPostHeader post={this.props.post} />
          <BlockPostContent post={this.props.post} />
          <BlockPostFooter post={this.props.post} />
        </div>
      );
    }
  }
}

export default BlockPost;

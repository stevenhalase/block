import React, { Component } from 'react';
import BlockPostHeader from './BlockPostHeader';
import BlockPostContent from './BlockPostContent';
import BlockPostAttachment from './BlockPostAttachment';
import BlockPostFooter from './BlockPostFooter';

const style = {
  flex: '1 1 calc(100% - 10px)',
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
    return (
      <div className="BlockPost" style={style}>
        <BlockPostHeader 
          apiservice={this.props.apiservice}
          showalert={this.props.showalert}
          getuserupdate={this.props.getuserupdate}
          post={this.props.post} 
          user={this.props.user} />
        {this.props.post.Attachments.length ?
          <BlockPostAttachment post={this.props.post} /> :
          ''
        }
        <BlockPostContent post={this.props.post} />
        <BlockPostFooter post={this.props.post} />
      </div>
    );
  }
}

export default BlockPost;

import React, { Component } from 'react';
import BlockNavigation from '../components/BlockNavigation';
import BlockFeed from '../components/BlockFeed';
import BlockPostEntry from '../components/BlockPostEntry';
import BlockPeopleList from '../components/BlockPeopleList';
import BlockConversation from '../components/BlockConversation';

const style = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}

const navWrapperStyle = {
  width: '80%',
  maxWidth: '768px',
  position: 'fixed',
  top: '0',
  borderTop: '25px solid #dfe6e9',
  borderBottom: '25px solid #dfe6e9',
  zIndex: '100'
}

const feedWrapperStyle = {
  width: '80%',
  maxWidth: '768px',
  position: 'relative',
  marginTop: '140px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}

class BlockDashboardPage extends Component {
  constructor(props) {
    super(props);

    this.updateFeed = this.updateFeed.bind(this);
  }
  render() {
    return (
      <div className="BlockDashboardPage" style={style}>
        <div style={navWrapperStyle}>
          <BlockNavigation 
            user={this.props.user}
            apiservice={this.props.apiservice}
            locationservice={this.props.locationservice}
            showalert={this.props.showalert}
            userlogout={this.props.userlogout}
            getuserupdate={this.props.getuserupdate} />
        </div>
        <div style={feedWrapperStyle}>
          <BlockPostEntry 
            user={this.props.user}
            apiservice={this.props.apiservice}
            showalert={this.props.showalert}
            newpost={this.updateFeed} />
          <BlockFeed 
            user={this.props.user}
            apiservice={this.props.apiservice}
            showalert={this.props.showalert}
            getuserupdate={this.props.getuserupdate}
            ref="feed" />
        </div>
        <BlockPeopleList />
        {this.props.openconversations.map((conversation, i) => {
          return(
            <BlockConversation conversation={conversation} key={i} />
          )
        })}
      </div>
    );
  }
  updateFeed() {
    this.refs.feed.update();
  }
}

export default BlockDashboardPage;

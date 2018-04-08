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
  position: 'fixed',
  top: '0',
  borderTop: '25px solid #dfe6e9',
  borderBottom: '25px solid #dfe6e9'
}

const feedWrapperStyle = {
  marginTop: '140px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}

class BlockDashboardPage extends Component {
  render() {
    return (
      <div className="BlockDashboardPage" style={style}>
        <div style={navWrapperStyle}>
          <BlockNavigation 
          apiservice={this.props.apiservice}
          locationservice={this.props.locationservice} />
        </div>
        <div style={feedWrapperStyle}>
          <BlockPostEntry />
          <BlockFeed apiservice={this.props.apiservice}/>
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
}

export default BlockDashboardPage;

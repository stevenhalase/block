import React, { Component } from 'react';
import Ionicon from 'react-ionicons'
import BlockAvatar from './BlockAvatar';

const style = {
  display: 'flex',
  alignItems: 'center',
  position: 'relative'
}

const moreIcon = {
  cursor: 'pointer'
}

const username = {
  color: '#FFF',
  fontSize: '12px',
  margin: '0 5px'
}

const settingsContainer = {
  position: 'absolute',
  bottom: '-120px',
  right: '-10px',
  display: 'flex',
  flexDirection: 'column',
  jusifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FFF',
  borderRadius: '4px',
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 2px'
}

const settingsHeader = {
  padding: '10px 20px',
  borderRadius: '4px 4px 0 0',
  color: '#FFF',
  backgroundColor: '#716DF9',
  fontSize: '12px',
}

const settingsOption = {
  padding: '10px 20px',
  color: '#716DF9',
  fontSize: '12px',
  cursor: 'pointer'
}

class BlockUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false
    }

    this.toggleOpen = this.toggleOpen.bind(this);
  }
  render() {
    if (this.props.user) {
      return (
        <div className="BlockUser" style={style}>
          <BlockAvatar 
            size={30}
            imagesrc={this.props.user.Image ? 
              this.props.user.Image : 
              'https://robohash.org/aspernaturquasreprehenderit.bmp?size=50x50&set=set1'} />
          <div style={username}>{this.props.user.FirstName} {this.props.user.LastName}</div>
          <Ionicon icon="md-more" color="#FFFFFF" fontSize="24px" style={moreIcon} onClick={this.toggleOpen}  />
          {this.state.opened ? 
            <div style={settingsContainer}>
                <div style={settingsHeader}>Settings</div>
                <div style={settingsOption}>Profile</div>
                <div style={settingsOption} onClick={this.props.userlogout}>Logout</div>
            </div> : 
            <div></div>}
        </div>
      );
    } else {
      return (
        <div className="BlockUser" style={style}>
          
        </div>
      );
    }
  }
  toggleOpen() {
    this.setState({ opened: !this.state.opened });
  }
}

export default BlockUser;

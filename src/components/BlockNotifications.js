import React, { Component } from 'react';
import Ionicon from 'react-ionicons';

const style = {
  position: 'relative'
}

const iconStyle = {
  cursor: 'pointer'
}

const notificationBadge = {
  position: 'absolute',
  top: '0',
  left: '20px',
  width: '15px',
  height: '15px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FFF',
  borderRadius: '50%',
  color: '#716DF9',
  fontSize: '12px'
}

const notificationsContainer = {
  position: 'absolute',
  bottom: '-100px',
  right: '-80px',
  display: 'flex',
  flexDirection: 'column',
  jusifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FFF',
  borderRadius: '4px',
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 2px'
}

const notificationsHeader = {
  padding: '10px 20px',
  borderRadius: '4px 4px 0 0',
  color: '#FFF',
  backgroundColor: '#716DF9',
  fontSize: '12px',
  width: '100%'
}

const notificationContainer = {
  padding: '10px 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}

const notificationText = {
  fontSize: '12px',
  whiteSpace: 'nowrap',
  marginRight: '25px'
}

const notificationActionButton = {
  borderRadius: '4px',
  backgroundColor: '#716DF9',
  color: '#FFF',
  border: 'none',
  padding: '5px',
  fontSize: '12px',
  cursor: 'pointer'
}

class BlockNotifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false
    }

    this.toggleOpen = this.toggleOpen.bind(this);
  }
  render() {
    if(this.state.opened) {
      return (
        <div className="BlockNotifications" style={style}>
            <Ionicon 
              icon="ios-notifications-outline" 
              color="#FFFFFF" 
              fontSize="24px"
              style={iconStyle}
              onClick={this.toggleOpen} />
            <div style={notificationBadge}>{this.props.user.Notifications.length}</div>
            {this.props.user.Notifications.length ?
              <div style={notificationsContainer}>
                <div style={notificationsHeader}>Notifications</div>
                {this.props.user.Notifications.map((notification, i) => {
                  return(
                    <div style={notificationContainer} key={i}>
                      <div style={notificationText}>
                        {notification.RelatedUser.FirstName + ' ' + notification.RelatedUser.LastName}
                      </div>
                      <button style={notificationActionButton} onClick={(e) => { this.approvePersonRequest(notification) }}>Accept</button>
                    </div>
                  )
                })}
              </div> :
              ''
            } 
        </div>
      );
    } else {
      return (
        <div className="BlockNotifications" style={style}>
            <Ionicon 
              icon="ios-notifications-outline" 
              color="#FFFFFF" 
              fontSize="24px"
              style={iconStyle}
              onClick={this.toggleOpen} />
            <div style={notificationBadge}>{this.props.user.Notifications.length}</div>
        </div>
      );
    }
  }
  toggleOpen() {
    this.setState({ opened: !this.state.opened });
  }
  approvePersonRequest(notification) {
    let request = {
      fromId: notification.RelatedUser._id,
      toId: this.props.user._id,
      date: new Date()
    }
    this.props.apiservice.approvePersonRequest(request)
      .then(response => {
        this.props.showalert('Request approved...');
        this.props.getuserupdate();
        console.log(response);
      })
      .catch(error => {
        console.log(error);
        this.props.showalert('Request approval failed...');
      })
  }
}

export default BlockNotifications;

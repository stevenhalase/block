import React, { Component } from 'react';
import Ionicon from 'react-ionicons';
import BlockAvatar from './BlockAvatar';
import BlockPostPersonInfo from './BlockPostPersonInfo';

const style = {
  width: '100%',
  height: '50px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderBottom: '1px solid #e9ebee',
  position: 'relative'
}

const postUserName = {
  fontWeight: '300',
  color: '#716DF9',
  cursor: 'pointer'
}

const postUserNameSelf = {
  fontWeight: '300'
}

class BlockPostHeader extends Component {
  constructor(props) {
    super(props);
    
    this.toggleInfo = this.toggleInfo.bind(this);
  }
  render() {
    let self = this.props.user ? this.props.user._id === this.props.post.User._id : false;
    let peopleInd = this.props.user.People.findIndex((person) => {
      return person.User._id === this.props.post.User._id;
    })
    let personRequestInd = this.props.user.PersonRequests.findIndex((request) => {
      return request.To._id === this.props.post.User._id;
    })
    let isInPeople = peopleInd >= 0;
    let hasPersonRequest = personRequestInd >= 0;

    return (
      <div className="BlockPostHeader" style={style}>
        {/* <BlockAvatar imagesrc={this.props.post.picture}/> */}
        <h5 style={self ? postUserNameSelf : postUserName} onClick={this.toggleInfo}>
          {this.props.post.User.FirstName + ' ' + this.props.post.User.LastName}
        </h5>
        {(isInPeople && !self) ?
          <Ionicon icon="ios-checkmark" color="#716DF9" fontSize="24px" /> :
          (hasPersonRequest && !self) ?
            <Ionicon icon="ios-checkmark" color="#999" fontSize="24px" /> :
            ''
        }
        <BlockPostPersonInfo 
          user={this.props.user}
          apiservice={this.props.apiservice}
          showalert={this.props.showalert}
          getuserupdate={this.props.getuserupdate}
          person={this.props.post.User}
          ref="info" />
      </div>
    );
  }
  toggleInfo() {
    if (!(this.props.user._id === this.props.post.User._id)) {
      this.refs.info.toggleOpen();
    }
  }
}

export default BlockPostHeader;

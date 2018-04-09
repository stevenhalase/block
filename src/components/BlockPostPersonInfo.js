import React, { Component } from 'react';
import BlockAvatar from './BlockAvatar';

const style = {
  position: 'absolute',
  bottom: '-60px'
}

const infoContainer = {
  display: 'flex',
  flexDirection: 'column',
  jusifyContent: 'center',
  alignItems: 'center',
  // backgroundColor: '#FFF',
  // borderRadius: '4px',
  // boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 2px'
}

const infoOption = {
  padding: '10px 20px',
  color: '#716DF9',
  fontSize: '12px',
  cursor: 'pointer'
}

const button = {
  borderRadius: '4px',
  backgroundColor: '#716DF9',
  color: '#FFF',
  border: 'none',
  padding: '10px',
  cursor: 'pointer',
  fontSize: '12px'
}

const buttonDisabled = {
  borderRadius: '4px',
  backgroundColor: '#999',
  color: '#FFF',
  border: 'none',
  padding: '10px',
  cursor: 'not-allowed',
  fontSize: '12px'
}

class BlockPostPersonInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false
    }

    this.toggleOpen = this.toggleOpen.bind(this);
    this.addPerson = this.addPerson.bind(this);
  }
  render() {
    let peopleInd = this.props.user.People.findIndex(person => {
      return person.User._id === this.props.person._id;
    })
    let requestsInd = this.props.user.PersonRequests.findIndex(request => {
      return request.To._id === this.props.person._id;
    })
    let inRequestsList = requestsInd >= 0;
    let inPeopleList = peopleInd >= 0;
    return (
      <div className="BlockPostPersonInfo" style={style}>
        {this.state.opened ? 
            <div style={infoContainer}>
                <div style={infoOption}>
                  <button style={inPeopleList || inRequestsList ? buttonDisabled : button} onClick={this.addPerson}>Add Person</button>
                </div>
            </div> : 
            <div></div>}
      </div>
    );
  }
  toggleOpen() {
    this.setState({ opened: !this.state.opened });
  }
  addPerson() {
    let peopleInd = this.props.user.People.findIndex(person => {
      return person.User._id === this.props.person._id;
    })
    let inPeopleList = peopleInd >= 0;
    if (!inPeopleList) {
      let request = {
        From: this.props.user,
        To: this.props.person,
        Date: new Date()
      }
      this.props.apiservice.personRequest(request)
        .then(response => {
          if (response.error) {
            this.props.showalert('Request failed...');
          }
          this.props.showalert('Request added...');
          this.props.getuserupdate();
        })
        .catch(error => {
          console.log(error);
          this.props.showalert('Request failed...');
        });
    }
    
  }
}

export default BlockPostPersonInfo;

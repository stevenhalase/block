import React, { Component } from 'react';
import Ionicon from 'react-ionicons';
import BlockLogo from './BlockLogo';

const style = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FFF',
  padding: '50px',
  borderRadius: '4px'
}

const inputContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const input = {
  padding: '10px',
  margin: '10px',
  fontFamily: "'Roboto', sans-serif",
  lineHeight: '1.5',
  overflow: 'hidden',
  border: '1px solid #716DF9',
  borderRadius: '4px'
}

const invalidInput = {
  padding: '10px',
  margin: '10px',
  fontFamily: "'Roboto', sans-serif",
  lineHeight: '1.5',
  overflow: 'hidden',
  border: '1px solid #e74c3c',
  borderRadius: '4px'
}

const submitButton = {
  width: '100%',
  backgroundColor: '#716DF9',
  border: 'none',
  borderRadius: '4px',
  color: '#FFF',
  padding: '10px',
  marginTop: '15px',
  cursor: 'pointer',
  textAlign: 'center'
}

const loginButton = {
  backgroundColor: '#FFF',
  border: 'none',
  color: '#716DF9',
  padding: '5px',
  marginTop: '5px',
  cursor: 'pointer',
}

class BlockRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [
        { id: 'firstname', value: '', type: 'text', placeholder: 'First Name', valid: true },
        { id: 'lastname', value: '', type: 'text', placeholder: 'Last Name', valid: true },
        { id: 'emailaddress', value: '', type: 'email', placeholder: 'Email', valid: true },
        { id: 'password', value: '', type: 'password', placeholder: 'Password', valid: true }
      ]
    }

    this.validate = this.validate.bind(this);
    this.submitRegistration = this.submitRegistration.bind(this);
  }
  render() {
    return (
      <div className="BlockRegister" style={style}>
        <BlockLogo dark={true}/>
        {this.state.fields.map((field, i) => {
          return(
            <input 
              id={'register-'+field.id} 
              type={field.type} 
              placeholder={field.placeholder} 
              style={field.valid ? input : invalidInput}
              key={i}
              onKeyPress={event => {
                if (event.key === "Enter") {
                  this.validate();
                }
              }}></input>
          )
        })}
        <button id="register-submit-button" style={submitButton} onClick={this.validate}>Register</button>
        <button id="login-button" style={loginButton} onClick={this.props.login}>Login</button>
      </div>
    );
  }
  validate() {
    let valid = true;
    for (let field of this.state.fields) {
      let fieldVal = document.getElementById('register-'+field.id).value;
      if (fieldVal.length === 0) {
        valid = false;
      }
    }

    if (!valid) {
      let fields = [
        { id: 'firstname', value: '', type: 'text', placeholder: 'First Name', valid: !(document.getElementById('register-firstname').value.length === 0) },
        { id: 'lastname', value: '', type: 'text', placeholder: 'Last Name', valid: !(document.getElementById('register-lastname').value.length === 0) },
        { id: 'emailaddress', value: '', type: 'email', placeholder: 'Email', valid: !(document.getElementById('register-emailaddress').value.length === 0) },
        { id: 'password', value: '', type: 'password', placeholder: 'Password', valid: !(document.getElementById('register-password').value.length === 0) }
      ];
      this.setState({ fields });
      this.props.showalert('Form is invalid...');
    } else {
      this.submitRegistration();
    }
  }
  submitRegistration() {
    let user = {
      SocketId: this.props.socketservice.socket.id,
      FirstName: document.getElementById('register-firstname').value,
      LastName: document.getElementById('register-lastname').value,
      EmailAddress: document.getElementById('register-emailaddress').value,
      Password: document.getElementById('register-password').value
    }
    this.props.showloader('Getting Location...');
    let _this = this;
    this.props.locationservice.getLocation()
      .then(() => {
        _this.props.closeloader();
        let location = _this.props.locationservice.location;
        if (location) {
          user.Locations = [{
            Latitude: location.latitude,
            Longitude: location.longitude,
            Date: new Date()
          }];
          _this.props.showloader('Completing registration...');
          _this.props.apiservice.registerUser(user)
            .then(response => {
              if (response.data.error) {
                _this.props.closeloader();
                _this.props.showalert('Registration failed...');
              } else {
                _this.props.closeloader();
                _this.props.userregister(response.data);
              }
            })
            .catch(error => {
              this.props.closeloader();
              _this.props.showalert('Registration failed...');
            })
        } else {
          this.props.closeloader();
          _this.props.showalert('Could not retrieve location...');
        }
      })
      .catch(error => {
        this.props.closeloader();
        this.props.showalert('Could not retrieve location...');
      })
  }
}

export default BlockRegister;

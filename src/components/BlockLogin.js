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

const registerButton = {
  backgroundColor: '#FFF',
  border: 'none',
  color: '#716DF9',
  padding: '5px',
  marginTop: '5px',
  cursor: 'pointer'
}

class BlockLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [
        { id: 'emailaddress', value: '', type: 'email', placeholder: 'Email', icon: 'ios-person', valid: true },
        { id: 'password', value: '', type: 'password', placeholder: 'Password', icon: 'ios-key', valid: true }
      ]
    }

    this.validate = this.validate.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }
  render() {
    return (
      <div className="BlockLogin" style={style}>
        <BlockLogo dark={true}/>
        {this.state.fields.map((field, i) => {
          return(
            <div style={inputContainer} key={i}>
              <Ionicon icon={field.icon} color="#716DF9" fontSize="24px" />
              <input 
                id={'login-'+field.id} 
                type={field.type} 
                placeholder={field.placeholder} 
                style={field.valid ? input : invalidInput}
                onKeyPress={event => {
                  if (event.key === "Enter") {
                    this.validate();
                  }
                }} ></input>
            </div>
          )
        })}
        <button id="login-submit-button" style={submitButton} onClick={this.validate}>Login</button>
        <button id="register-button" style={registerButton} onClick={this.props.register}>Register</button>
      </div>
    );
  }
  validate() {
    let valid = true;
    for (let field of this.state.fields) {
      let fieldVal = document.getElementById('login-'+field.id).value;
      if (fieldVal.length === 0) {
        valid = false;
      }
    }

    if (!valid) {
      let fields = [
        { id: 'emailaddress', value: '', type: 'email', placeholder: 'Email', icon: 'ios-person', valid: !(document.getElementById('login-emailaddress').value.length === 0) },
        { id: 'password', value: '', type: 'password', placeholder: 'Password', icon: 'ios-key', valid: !(document.getElementById('login-password').value.length === 0) }
      ];
      this.setState({ fields });
      this.props.showalert('Form is invalid...');
    } else {
      this.submitLogin();
    }
  }
  submitLogin() {
    let user = {
      EmailAddress: document.getElementById('login-emailaddress').value,
      Password: document.getElementById('login-password').value
    }
    this.props.showloader('Getting Location...');
    let _this = this;
    this.props.locationservice.getLocation()
      .then(() => {
        _this.props.closeloader();
        let location = _this.props.locationservice.location;
        if (location) {
          user.Location = {
            Latitude: location.latitude,
            Longitidue: location.longitude,
            Date: new Date()
          };
          _this.props.showloader('Logging in...');
          _this.props.apiservice.loginUser(user)
            .then(response => {
              if (response.data.error) {
                _this.props.closeloader();
                _this.props.showalert('Login failed...');
              } else {
                _this.props.closeloader();
                _this.props.userlogin(response.data);
              }
            })
            .catch(error => {
              this.props.closeloader();
              _this.props.showalert('Login failed...');
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

export default BlockLogin;

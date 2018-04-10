import React, { Component } from 'react';
import BlockLogin from '../components/BlockLogin';
import Particles from 'react-particles-js';
import ParticlesConfig from '../assets/ParticlesConfig';
import BlockRegister from '../components/BlockRegister';

const style = {
  height: '100%',
  width: '100%',
  backgroundColor: '#4931A8',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}

const particlesStyle = {
  height: '100%',
  width: '100%',
  position: 'fixed',
  top: '0',
  left: '0',
  zIndex: '100'
}

const loginContainer = {
  zIndex: '101'
}

class BlockAuthorizationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      register: false
    }

    this.handleLoginSwitch = this.handleLoginSwitch.bind(this);
    this.handleRegisterSwitch = this.handleRegisterSwitch.bind(this);
  }
  render() {
    if(this.state.register) {
      return (
        <div className="BlockAuthorizationPage" style={style}>
          <Particles params={ParticlesConfig} style={particlesStyle} />
          <div style={loginContainer}>
            <BlockRegister 
              login={this.handleLoginSwitch}
              apiservice={this.props.apiservice}
              locationservice={this.props.locationservice}
              socketservice={this.props.socketservice}
              userregister={this.props.userregister}
              showloader={this.props.showloader}
              closeloader={this.props.closeloader}
              showalert={this.props.showalert} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="BlockAuthorizationPage" style={style}>
          <Particles params={ParticlesConfig} style={particlesStyle} />
          <div style={loginContainer}>
            <BlockLogin 
              register={this.handleRegisterSwitch} 
              apiservice={this.props.apiservice} 
              locationservice={this.props.locationservice}
              socketservice={this.props.socketservice}
              userlogin={this.props.userlogin}
              showloader={this.props.showloader}
              closeloader={this.props.closeloader}
              showalert={this.props.showalert} />
          </div>
        </div>
      );
    }
  }
  handleLoginSwitch() {
    this.setState({ register: false });
  }
  handleRegisterSwitch() {
    this.setState({ register: true });
  }
}

export default BlockAuthorizationPage;

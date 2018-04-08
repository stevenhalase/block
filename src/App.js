import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import APIService from './services/APIService';
import LocationService from './services/LocationService';
import BlockDashboardPage from './pages/BlockDashboardPage';

import './App.css';
import BlockPageContainer from './components/BlockPageContainer';
import BlockLoader from './components/BlockLoader';
import BlockAuthorizationPage from './pages/BlockAuthorizationPage';
import BlockAlert from './components/BlockAlert';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      APIService: new APIService(),
      LocationService: new LocationService(),
      user: null,
      openConversations: [{
        from: { name: 'Steve' },
        to: { name: 'John' },
        messages: [{
          from: { name: 'Steve' },
          to: { name: 'John' },
          message: 'Hey man whats up?'
        },{
          from: { name: 'Steve' },
          to: { name: 'John' },
          message: 'Not much man'
        },{
          from: { name: 'Steve' },
          to: { name: 'John' },
          message: 'Cool beans'
        }]
      }]
    }
    
    this.openLoader = this.openLoader.bind(this);
    this.closeLoader = this.closeLoader.bind(this);
    this.openAlert = this.openAlert.bind(this);
    this.userLogin = this.userLogin.bind(this);
    this.userRegister = this.userRegister.bind(this);
  }
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' 
            render={(props) => (
              this.state.user ?
                <BlockPageContainer>
                  <BlockDashboardPage 
                    apiservice={this.state.APIService} 
                    locationservice={this.state.LocationService}
                    openconversations={this.state.openConversations} />
                </BlockPageContainer> :
                <BlockPageContainer>
                  <BlockAuthorizationPage
                    apiservice={this.state.APIService} 
                    locationservice={this.state.LocationService}
                    userlogin={this.userLogin}
                    userregister={this.userRegister}
                    showloader={this.openLoader}
                    closeloader={this.closeLoader}
                    showalert={this.openAlert} />
                </BlockPageContainer>
            )}/>
        </Switch>
        <BlockLoader ref="loader" />
        <BlockAlert ref="alert" />
      </div>
    );
  }
  openLoader(message) {
    this.refs.loader.open(message);
  }
  closeLoader() {
    this.refs.loader.close();
  }
  openAlert(message) {
    this.refs.alert.open(message);
  }
  userLogin(user) {
    this.setState({ user });
  }
  userRegister(user) {
    this.setState({ user });
  }
}

export default App;

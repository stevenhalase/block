import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import APIService from './services/APIService';
import LocationService from './services/LocationService';
import StorageService from './services/StorageService';
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
      StorageService: new StorageService(),
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
    this.userLogout = this.userLogout.bind(this);
    this.userRegister = this.userRegister.bind(this);
    this.getLocalUser = this.getLocalUser.bind(this);
    this.getUserUpdate = this.getUserUpdate.bind(this);
  }
  componentWillMount() {
    this.getLocalUser();
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
                    user={this.state.user}
                    apiservice={this.state.APIService} 
                    locationservice={this.state.LocationService}
                    showalert={this.openAlert}
                    openconversations={this.state.openConversations}
                    userlogout={this.userLogout}
                    getuserupdate={this.getUserUpdate} />
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
    this.state.StorageService.setUser(user);
    this.setState({ user });
  }
  userLogout() {
    this.state.StorageService.clearUser();
    this.setState({ user: null });
  }
  userRegister(user) {
    this.state.StorageService.setUser(user);
    this.setState({ user });
  }
  getLocalUser() {
    let user = this.state.StorageService.getUser();
    if (user) {
      this.setState({ user });
    }
  }
  getUserUpdate() {
    this.state.APIService.getUser(this.state.user._id)
      .then(response => {
        let user = response.data;
        this.state.StorageService.setUser(user);
        this.setState({ user });
      })
      .catch(error => {
        console.log(error);
      })
  }
}

export default App;

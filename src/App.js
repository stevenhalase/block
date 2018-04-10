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
import SocketService from './services/SocketService';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      APIService: new APIService(),
      LocationService: new LocationService(),
      StorageService: new StorageService(),
      SocketService: new SocketService(),
      user: null,
      openConversations: []
    }
    
    this.openLoader = this.openLoader.bind(this);
    this.closeLoader = this.closeLoader.bind(this);
    this.openAlert = this.openAlert.bind(this);
    this.userLogin = this.userLogin.bind(this);
    this.userLogout = this.userLogout.bind(this);
    this.userRegister = this.userRegister.bind(this);
    this.getLocalUser = this.getLocalUser.bind(this);
    this.getUserUpdate = this.getUserUpdate.bind(this);
    this.openConversation = this.openConversation.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.deliverMessage = this.deliverMessage.bind(this);

    this.state.SocketService.addBinding('Message:AttemptDelivery', this.deliverMessage);
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
                    openconversation={this.openConversation}
                    openconversations={this.state.openConversations}
                    sendmessage={this.sendMessage}
                    userlogout={this.userLogout}
                    getuserupdate={this.getUserUpdate} />
                </BlockPageContainer> :
                <BlockPageContainer>
                  <BlockAuthorizationPage
                    apiservice={this.state.APIService} 
                    locationservice={this.state.LocationService}
                    socketservice={this.state.SocketService}
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
  openConversation(to) {
    let openConversations = this.state.openConversations;
    let openConversationsInd = openConversations.findIndex(c => c.To._id === to._id || c.From._id === to._id);
    if (openConversationsInd < 0) {
      openConversations.push({
        Id: Date.now(),
        From: this.state.user,
        To: to,
        Messages: this.state.user.Messages.filter(m => m.To._id === to._id || m.From._id === to._id)
      })
      this.setState({ openConversations });
    }
  }
  sendMessage(message) {
    this.state.SocketService.sendMessage(message);

    let openConversations = this.state.openConversations;
    let openConversationsInd = openConversations.findIndex(c => c.Id === message.ConversationId);
    if (openConversationsInd >= 0) {
      openConversations[openConversationsInd].Messages.push(message);
      this.setState({ openConversations });
    }
  }
  deliverMessage(message) {
    let openConversations = this.state.openConversations;
    let conversationInd = openConversations.findIndex(c => c.To._id === message.From._id);
    if (conversationInd >= 0) {
      openConversations[conversationInd].Messages.push(message);
      this.setState({ openConversations });
    } else {
      let previousMessages = this.state.user.Messages.filter(m => m.To._id === message.From._id || m.From._id === message.From._id);
      previousMessages.push(message)
      openConversations.push({
        Id: Date.now(),
        From: message.To,
        To: message.From,
        Messages: previousMessages
      })
      this.setState({ openConversations });
    }
  }
}

export default App;

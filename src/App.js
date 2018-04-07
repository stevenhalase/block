import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import APIService from './services/APIService';
import LocationService from './services/LocationService';
import BlockDashboard from './pages/BlockDashboard';

import './App.css';
import BlockPageContainer from './components/BlockPageContainer';
import BlockLoader from './components/BlockLoader';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      APIService: new APIService(),
      LocationService: new LocationService(),
      loadingMessage: 'Getting Location...',
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
  }
  componentDidMount() {
    this.openLoader();
    this.state.LocationService.getLocation()
      .then(() => {
        this.closeLoader();
      })
      .catch(() => {
        this.closeLoader();
      })
  }
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' 
            render={(props) => (
              <BlockPageContainer>
                <BlockDashboard 
                  apiservice={this.state.APIService} 
                  locationservice={this.state.LocationService}
                  openconversations={this.state.openConversations} />
              </BlockPageContainer>
            )}/>
        </Switch>
        <BlockLoader message={this.state.loadingMessage} ref="loader"/>
      </div>
    );
  }
  openLoader() {
    this.refs.loader.open();
  }
  closeLoader() {
    this.refs.loader.close();
  }
}

export default App;

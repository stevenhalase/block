import axios from 'axios';

import mockdata from './mockdata';

export default class APIService {
  constructor() {
    // this.base = 'http://localhost:3080/api/v1/';
    this.base = 'https://block-dev.herokuapp.com/api/v1/';
    this.routes = {
      getPosts: 'posts',
      users: 'users'
    }
  }

  getPosts() {
    return new Promise((resolve, reject) => {
      resolve(mockdata);
    })
  }

  registerUser(user) {
    return axios.post(this.base+this.routes.users+'/register', user);
  }

  loginUser(user) {
    return axios.post(this.base+this.routes.users+'/login', user);
  }
  
}
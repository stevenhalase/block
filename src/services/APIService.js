import axios from 'axios';

import mockdata from './mockdata';

export default class APIService {
  constructor() {
    // this.base = 'http://localhost:3080/api/v1/';
    this.base = window.location.hostname === 'localhost' ?
      'http://localhost:3080/api/v1/' :
      'https://block-dev.herokuapp.com/api/v1/';
    this.routes = {
      posts: 'posts',
      users: 'users'
    }
  }

  getPosts() {
    return axios.get(this.base+this.routes.posts);
  }

  submitPost(post) {
    return axios.post(this.base+this.routes.posts, post)
  }

  registerUser(user) {
    return axios.post(this.base+this.routes.users+'/register', user);
  }

  loginUser(user) {
    return axios.post(this.base+this.routes.users+'/login', user);
  }

  getUser(userId) {
    return axios.get(this.base+this.routes.users+'/'+userId);
  }

  personRequest(request) {
    return axios.post(this.base+this.routes.users+'/personrequest', request);
  }

  approvePersonRequest(request) {
    return axios.post(this.base+this.routes.users+'/personrequest/approve', request);
  }
}
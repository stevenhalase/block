import axios from 'axios';

import mockdata from './mockdata';

export default class APIService {
  constructor() {
    this.base = 'http://localhost:3080/api/v1/';
    this.routes = {
      getPosts: 'posts'
    }
  }

  getPosts() {
    return new Promise((resolve, reject) => {
      resolve(mockdata);
    })
  }
  
}
export default class APIService {
  constructor() {
    this.storageSupported = this.checkStorageSupported();
  }

  checkStorageSupported() {
    var test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch(e) {
        return false;
    }
  }

  getUser() {
    if (this.storageSupported) {
      return JSON.parse(localStorage.getItem('Block.User'));
    }
  }

  setUser(user) {
    if (this.storageSupported) {
      localStorage.setItem('Block.User', JSON.stringify(user));
    }
  }

  clearUser() {
    if (this.storageSupported) {
      localStorage.removeItem('Block.User');
    }
  }
  
}
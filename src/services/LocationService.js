import axios from 'axios';

export default class LocationService {
  constructor() {
    this.location = null;
    // this.init();
  }

  getLocation() {
    return new Promise((resolve, reject) => {
      axios.get('https://ipinfo.io/geo')
        .then(response => {
          var loc = response.data.loc.split(',');
          var coords = {
              latitude: loc[0],
              longitude: loc[1]
          };
          this.location = coords;
          resolve();
        })
        .catch(error =>{
          console.log(error);
          reject();
        });
    });
  }
  
}
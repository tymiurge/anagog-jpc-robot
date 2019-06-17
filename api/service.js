const axios = require('axios');
const fs = require('fs');
const { CONFIG_FILE_PATH } = require('./../vars');
const endpoints =  require('./endpoints');

class ApplicationService {

  constructor() {
    try {
      this.baseUrl = JSON.parse(fs.readFileSync( CONFIG_FILE_PATH )).baseUrl;
    } catch(e) {
      console.error(e);
    }
    this.requestConfig = {
      headers: {
        'content-type': 'application/json',
      },
      validateStatus: function (status) {
        return (status >= 200 && status < 300) || status === 412; 
      },
    };
  }
  _reportError(error) {
    console.log(error.message);
    console.info(error)
  }

  add(appName, appKey) {
    return axios.post(`${this.baseUrl}/${endpoints.add(appName, appKey)}`, {}, this.requestConfig);
  }

  deleteApp(appName) {
    return axios.post(`${this.baseUrl}/${endpoints.delete(appName)}`, {}, this.requestConfig);
  };

  getApps() {
    return axios.get(`${this.baseUrl}/${endpoints.list()}`, this.requestConfig)
      .then(response => response.data.Apps)
      .catch( this._reportError )
  }

  uploadConfig(appName, appConfig) {
    return axios.post(`${this.baseUrl}/${endpoints.upload(appName)}`, appConfig, this.requestConfig)
  }

  downloadAppConfig(appName) {
    return axios.get(`${this.baseUrl}/${endpoints.download(appName)}`, this.requestConfig)
  }

  getHealth() {
    return axios.get(`${this.baseUrl}/${endpoints.status()}`, this.requestConfig)
  }
}

module.exports = new ApplicationService();

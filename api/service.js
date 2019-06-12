// const BaseService = require('./base-service');
const axios = require('axios');

class ApplicationService {

  constructor() {
    this.baseUrl = 'https://dev-api-jedai.anagog.com/jpc-server';
    this.requestConfig = {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        'accept': 'application/json, text/plain, */*',
        'cookie': '_ga=GA1.2.1104494379.1559510934; _fbp=fb.1.1559510934474.1759205429; SESSID=s%3AnKpIR39NnCHHPXxlm_WGhwME9Dj17Ir_.265aDMXgO5sUHRSX0O68adHM%2FxmHZ2e6sGTkETmgEEs'
      },
      validateStatus: function (status) {
        return (status >= 200 && status < 300) || status === 412; 
      },
    };
  }

  add(appName, appKey) {
    return axios.post(`${this.baseUrl}/apps`, {APIKey: appKey, AppName: appName}, this.requestConfig);
  }

  deleteApp(appName) {
    return axios.delete(`${this.baseUrl}/apps/${appName}`, this.requestConfig);
  };

  uploadConfig(appName, appConfig) {
    return axios.post(`${this.baseUrl}/apps/${appName}/upload`, appConfig, this.requestConfig)
  }

  getApps() {
    return axios.get(`${this.baseUrl}/apps`, this.requestConfig)
  }

  downloadAppConfig(appName) {
    return axios.get(`${this.baseUrl}/apps/${appName}/download`, this.requestConfig)
  }

  getHealth() {
    return axios.get(`${this.baseUrl}/health`, this.requestConfig)
  }
}

module.exports = new ApplicationService();

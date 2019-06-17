const service = require('./../api/service');
const fs = require('fs');
const rimraf = require("rimraf");

exports.dumpApps = async (folderPath) => {
	try {
    if (fs.existsSync(folderPath)){
      rimraf.sync(folderPath);
    }
    fs.mkdirSync(folderPath);
    const response = await service.getApps();
    const apps = response.data.data
    for (let app of apps) {
      const appName = app.Name;
      fs.mkdirSync(`${folderPath}/${appName}`);
      fs.writeFileSync(`${folderPath}/${appName}/appDetails.json`, JSON.stringify(app));
      const configsFolderPath = `${folderPath}/${appName}/configs`
      fs.mkdirSync(configsFolderPath);
      const downloadResponse = await service.downloadAppConfig(appName);
      if (downloadResponse.status === 200 ) {
        const appConfig = downloadResponse.data.data.Data;
        fs.writeFileSync(`${configsFolderPath}/config.json`, JSON.stringify(appConfig));
      } else if(downloadResponse.status === 412) {
        console.warn(`WARNING: ${appName} has no config`);  
      }
      console.log(`INFO: ${appName} application dumped to ${folderPath}/${appName} folder`);
    }
	} catch(e) {
		console.log(e.message);
	}

};

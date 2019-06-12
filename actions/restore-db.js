const service = require('./../api/service');
const fs = require('fs');
const { join } = require('path');

exports.restoreDb = async (folderPath) => {
	try {
    const appFolders = fs.readdirSync(folderPath).filter(f => fs.statSync(join(folderPath, f)).isDirectory())
    for (let appFolder of appFolders) {
      const appFolderPath = `${folderPath}/${appFolder}`;
      const {Name, ApiKey } = JSON.parse(fs.readFileSync(`${appFolderPath}/appDetails.json`));
      await service.add(Name, ApiKey);
      console.log(`${Name} application added/restored`);
      const configFilesFolderPath = `${appFolderPath}/configs`
      const configFiles = fs.readdirSync(configFilesFolderPath).filter(f => !fs.statSync(join(configFilesFolderPath, f)).isDirectory());
      for(let configFile of configFiles) {
        const config = JSON.parse(fs.readFileSync(`${configFilesFolderPath}/${configFile}`))
        await service.uploadConfig(Name, config)
        console.log(`${configFiles} configs have been uploaded to the ${Name} application.`)
      }
    }
	} catch(e) {
		console.log(e.message);
	}
};

const service = require('./../api/service');
exports.uploadApplicationConfig = async (appDetailsFileName, appConfigFile) => {
	try {
    const { appName } = require(`../${appDetailsFileName}`);
    const appConfig = require(`../${appConfigFile}`)
		await service.uploadConfig(appName, appConfig);
		console.log(`uploading configuration of application with name = ${appName} completed.`)
	} catch(e) {
		console.log(e.message);
	}

};

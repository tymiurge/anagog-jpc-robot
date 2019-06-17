const service = require('./../api/service');
exports.deleteApplication = async (fileName) => {
	try {
		const {appName} = require(`../${fileName}`);
		const response = await service.deleteApp(appName);
		console.info(response)
    console.log(`application with appName = ${appName} deleted.`);
	} catch(e) {
		console.log(e.message);
	}
};

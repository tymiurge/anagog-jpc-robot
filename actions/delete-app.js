const service = require('./../api/service');
exports.deleteApplication = async (fileName) => {
	try {
		const {appName} = require(`../${fileName}`);
    await service.deleteApp(appName);
    console.log(`application with appName = ${appName} deleted.`);
	} catch(e) {
		console.log(e.message);
	}
};

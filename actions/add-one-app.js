const service = require('./../api/service');

exports.addOneApplication = async (fileName) => {
	try {
		const {appName, appKey} = require(`../${fileName}`);
		await service.add(appName, appKey);
		console.log(`application with appName = ${appName} and appKey = ${appKey} added.`)
	} catch(e) {
		console.log(e.message);
	}

};

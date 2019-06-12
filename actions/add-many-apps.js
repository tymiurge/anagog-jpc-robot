const service = require('./../api/service');

exports.addManyApplication = async (fileName) => {
	try {
    const apps = require(`../${fileName}`);
    for (let app of apps) {
      const { appName, appKey} = app;
      await service.add(appName, appKey);
		  console.log(`application with appName = ${appName} and appKey = ${appKey} added.`)  
    }
	} catch(e) {
		console.log(e.message);
	}
};

const service = require('./../api/service');

const shouldBeRemoved = (appName, prefix) => {
  if (prefix === '') {
    return true;
  }
  return appName.indexOf(prefix) === 0;
}

exports.clearDB = async (prefix) => {
	try {
    const response = await service.getApps();
    const apps = response.data.data;
    for (let app of apps) {
      const appName = app.Name;
      if (shouldBeRemoved(appName, prefix)) {
        await service.deleteApp(appName);
        console.log(`application with appName = ${appName} deleted.`);
      } 
    }
	} catch(e) {
		console.log(e.message);
	}
};

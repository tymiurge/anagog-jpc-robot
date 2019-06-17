const service = require('./../api/service');

const shouldBeRemoved = (appName, prefix) => {
  if (prefix === '') {
    return true;
  }
  return appName.indexOf(prefix) === 0;
}

exports.clearDB = async (prefix) => {
  const apps = await service.getApps();
  for (let app of apps) {
    const appName = app.Name;
    if (shouldBeRemoved(appName, prefix)) {
      await service.deleteApp(appName);
      console.log(`application with appName = ${appName} deleted.`);
    } 
  }
};

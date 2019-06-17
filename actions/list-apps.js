const service = require('./../api/service');

exports.appsList = async () => {
	try {
    const response = await service.getApps();
    const apps = response.data.Apps;
    apps
      // .sort((first, second) => first.TimeStamp - second.TimeStamp)
      .forEach( ({Name, ApiKey }, idx) => console.log(`${idx}: name = ${Name}, key = ${ApiKey}`));
	} catch(e) {
		console.log(e.message);
	}

};

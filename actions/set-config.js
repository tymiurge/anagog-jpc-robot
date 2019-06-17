const fs = require('fs');
const { CONFIG_FILE_PATH } = require('./../vars');

exports.setBaseUrl = baseUrl => {
	try {
    const config = JSON.parse(fs.readFileSync(CONFIG_FILE_PATH));
		fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify({...config, baseUrl}));
	} catch(e) {
		console.log(e.message);
	}
};

exports.report = () => {
	try {
    const config = JSON.parse(fs.readFileSync(CONFIG_FILE_PATH));
    console.log('The robot config is: ')
    console.info(config)
	} catch(e) {
		console.log(e.message);
	}
};

const fs = require('fs');

const CONFIG_FILE = '.config';

exports.setBaseUrl = baseUrl => {
	try {
    const config = JSON.parse(fs.readFileSync(CONFIG_FILE));
		fs.writeFileSync(CONFIG_FILE, JSON.stringify({...config, baseUrl}));
	} catch(e) {
		console.log(e.message);
	}
};

exports.report = () => {
	try {
    const config = JSON.parse(fs.readFileSync(CONFIG_FILE));
    console.log('The robot config is: ')
    console.info(config)
	} catch(e) {
		console.log(e.message);
	}
};

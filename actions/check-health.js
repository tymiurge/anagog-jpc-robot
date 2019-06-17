const service = require('./../api/service');

exports.checkHeath = async () => {
	try {
    const { data } = await service.getHealth()
		console.info(data)
	} catch(e) {
		console.log(e.message);
	}

};

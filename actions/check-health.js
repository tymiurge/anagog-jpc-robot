const service = require('./../api/service');

exports.checkHeath = async () => {
	try {
    const response = await service.getHealth()
    const { data } = response.data;
		console.info(data)
	} catch(e) {
		console.log(e.message);
	}

};

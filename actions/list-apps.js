const service = require('./../api/service');

exports.appsList = async (searchFor = '') => {
  // console.log('searchFor = ' + searchFor);
  (await service.getApps())
    .sort((first, second) => first.TimeStamp - second.TimeStamp)
    .forEach( ({Name, ApiKey, Versions }, idx) => {
      if (Name.includes(searchFor)) {
        console.log(`${idx}: name = ${Name}, key = ${ApiKey}, amount of uploaded config versions = ${Versions.length}`)
      }
    });
}

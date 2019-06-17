module.exports = {
  add: (appName, appKey) => `config/manage/add-app/jedaisdk/${appName}/${appKey}`,
  delete: appName => `config/manage/delete-app/jedaisdk/${appName}`,
  list: () => `config/manage/list/jedaisdk`,
  upload: appName => `config/manage/upload/jedaisdk/${appName}`,
  download: appName => `config/manage/download/jedaisdk/${appName}`,
  status: () => 'config/manage/health'
 }
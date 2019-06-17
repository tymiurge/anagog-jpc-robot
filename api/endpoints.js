module.exports = {
  add: (appName, appKey) => `add-app/jedaisdk/${appName}/${appKey}`,
  delete: appName => `delete-app/jedaisdk/${appName}`,
  list: () => `list/jedaisdk`,
  upload: appName => `upload/jedaisdk/${appName}`,
  download: appName => `download/jedaisdk/${appName}`,
  status: () => 'health'
 }
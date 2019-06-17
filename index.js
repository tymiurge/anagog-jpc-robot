
const package = require('./package.json');
const program = require('commander');
const { addOneApplication } = require('./actions/add-one-app');
const { deleteApplication } = require('./actions/delete-app');
const { uploadApplicationConfig } = require('./actions/upload-app-config');
const { dumpApps } = require('./actions/dump-apps');
const { clearDB } = require('./actions/clear-db');
const { addManyApplication } = require('./actions/add-many-apps');
const { restoreDb } = require('./actions/restore-db');
const { checkHeath } = require('./actions/check-health');
const { setBaseUrl, report } = require('./actions/set-config');

const dumpCommandDescription =                                                           
`
                                                         Dumps applications into specified folder. If the folder exists it will be removed first with all its content - be carefull. 
                                                         The dump structure is going to be:
                                                           folder specified by the folderPath argment. 
                                                           |__appName_1 (folder)
                                                           |____appName_1.json (file with the app metadata)
                                                           |____configs (folder)
                                                           |______config1.json
                                                           |______config2.json
                                                           |_______   ......
                                                           |__appName_2 (folder)
                                                           |____appName_2.json
                                                           |____configs (folder)
                                                           | ....................................................
`;

program
  .version(package.version)
  .description('Robot for JPC operations like adding/removing applications.');

program
  .command('addApplication <fileName>')
  .alias('a')
  .description('Adds application.')
  .action(addOneApplication);

program
  .command('addManyApplications <fileName')
  .alias('am')
  .description('Adds all applications specified in the file name json file.')
  .action(addManyApplication);
    
program
  .command('deleteApplication <fileName>')
  .alias('da')
  .description('Deletes application.')
  .action(deleteApplication);

program
  .command('uploadConfig <appDetailsFileName> <appConfigFileName')
  .alias('uc')
  .description('Uploads appliation configuration.')
  .action(uploadApplicationConfig);

program
  .command('dump <folderPath>')
  .description(dumpCommandDescription)
  .alias('du')
  .action(dumpApps);

program
  .command('clear')
  .alias('cl')
  .option('-p, --prefix <prefix>', 'if specified, the command will delete only those application that are prefixed with the provided option value.')
  .description('clears BD; if the -p|--prefix option is specified, the command will delete only those application that are prefixed with the provided option value.')
  .action(
    options => {
      const prefix = options.prefix || '';
      clearDB(prefix)
    }
  );

program
  .command('restore <folderPath>')
  .alias('rdb')
  .description('adds all applications from the folder path and uploads all configs; the structure of folder should be like in dump - see dump command description.')
  .action(restoreDb);

program
  .command('reportHeath')
  .alias('rh')
  .description('outputs statuses of all services.')
  .action(checkHeath);

program
  .command('config')
  .alias('c')
  .option('-b, --base_url <base_url>', 'if specified, the program will set up base url of API server in the config.')
  .option('-s, --silent', 'if set, no report on config state is outputed to the console.')
  .description('reads and modifies the robot config.')
  .action(
    options => {
      if (options.base_url) { setBaseUrl(options.base_url) }
      if (!options.silent) { report() };
    }
  );
   
program.parse(process.argv);


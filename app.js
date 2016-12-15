#!/user/bin/node

const program = require('commander');
let dataBacker = require('./main');

program
  .version(require('./package.json').version)
  .command('push', 'Push stdin to the service')
  .parse(process.argv);

// let res = dataBacker.getContent('jpfeiffer', 'test', 'j');
// res.pipe(process.stdout);

// let res = dataBacker.push('jpfeiffer', 'test', 'j', 'I wuv muchi');
// res.pipe(process.stdout);
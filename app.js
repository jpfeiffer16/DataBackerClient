#!/user/bin/node

const program = require('commander');
let dataBacker = require('./main');

// process.stdin.pipe(process.stdout);

program
  .version(require('./package.json').version)
  .command('push')
  .option('-k, --key [string]', 'Key to use')
  .description('Push stdin to the service')
  .action(push);
program.parse(process.argv);

// let res = dataBacker.getContent('jpfeiffer', 'test', 'j');
// res.pipe(process.stdout);


function push(cmd, options) {
  // if (!program.key) {
  //   console.error('Must specify a key');
  //   process.exit(1);
  // }

  // process.stdin.resume();
  // var fs = require('fs');
  // var response = fs.readSync(process.stdin.fd, 100, 0, "utf8");
  // process.stdin.pause();
  // console.log(response);
  // let stdin = process.stdin.read();
  // console.log(stdin);
  // if (process.stdin)
  console.log('Pushing data to service');
  //TODO: Pipe stdin to the service
}
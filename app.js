#!/user/bin/node

const program = require('commander');
let dataBacker = require('./main');

// process.stdin.pipe(process.stdout);

program.version(require('./package.json').version);
program
  .command('push')
  .option('-k, --key [string]', 'Key to use')
  .option('-u, --username [string]', 'Username')
  .option('-p, --password [string]', 'Password')
  .description('Push stdin to the service')
  .action(push);

program
  .command('get')
  .option('-k, --key [string]', 'Key to use')
  .option('-v, --version [string]', 'Version to fetch')
  .option('-u, --username [string]', 'Username')
  .option('-p, --password [string]', 'Password')
  .option('-f, --file [string]', 'File')
  .description('Push stdin to the service')
  .action(get);

program.parse(process.argv);

function push(cmd, options) {
  //Sanity checks
  if (!cmd.key) {
    console.error('Must specify a key');
    process.exit(1);
  }
  if (!cmd.username) {
    console.error('Must specify a username');
    process.exit(1);
  }
  if (!cmd.password) {
    console.error('Must specify a password');
    process.exit(1);
  }

  const chunks = [];
  process.stdin.on('data', function (chunk) {
    chunks.push(chunk);
  });
  process.stdin.on('end', function () {
    let stdin = Buffer.concat(chunks).toString();
    if (stdin == '') {
      console.error('No data on stdin');
      process.exit(1);
    }
    console.log('Pushing data to service');
    dataBacker.push(cmd.username, cmd.password, cmd.key, stdin)
      .on('end', () => {
        console.log();
      })
      .pipe(process.stdout);
  });
}

function get(cmd, options) {
    if (!cmd.key) {
    console.error('Must specify a key');
    process.exit(1);
  }
  if (!cmd.username) {
    console.error('Must specify a username');
    process.exit(1);
  }
  if (!cmd.password) {
    console.error('Must specify a password');
    process.exit(1);
  }
  const fs = require('fs');
  const path = require('path');
  let res = dataBacker.getContent(cmd.username, cmd.password, cmd.key, cmd.version);

  // console.log(cmd.file);
  if (cmd.file) {
    res.pipe(fs.createWriteStream(path.resolve(cmd.file)));
  } else {
    res.pipe(process.stdout);
  }
}
const store = require('./store');
const {add, remove, get} = require('./store');
const help = `
Usage: kvs <command> <key> <value>

where <command> is one of:
  add, remove, get

Example:
  kvs add fruit apple
  kvs get fruit
  kvs remove fruit
`;

module.exports = function(args) {
  const params = args.slice(2);
  const [cmd, key] = params;
  const value = params.slice(2).join(' ');

  if(!cmd || cmd === 'help') {
    return console.log(help);
  }

  if(!['add', 'get', 'remove'].includes(cmd)) {
    return console.error('\x1b[31m', `"${cmd}" is not a valid command.\n`, help);
  }

  if(cmd === 'add' && (!key || !value)) {
    return console.error('\x1b[31m', 'key and/or value missing.\n', help);
  }

  if(!key) {
    return console.error('\x1b[31m', 'key is missing.\n', help);
    console.log(help);
  }

  if(cmd === 'add') console.log(add(key, value));
  if(cmd === 'get') console.log(get(key));
  if(cmd === 'remove') console.log(remove(key));
};

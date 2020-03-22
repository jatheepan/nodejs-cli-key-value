const store = require('./store');
const HELP = `
Usage: kvs <command> <key> <value>

where <command> is one of:
  add, remove, get

Example:
  kvs add fruit apple
  kvs get fruit
  kvs remove fruit
`;

function cli(args) {
  const params = args.slice(2);
  const [cmd, key] = params;
  const value = params.slice(2).join(' ');

  if(!cmd || cmd === 'help') {
    return console.log(HELP);
  }

  if(!['add', 'get', 'remove'].includes(cmd)) {
    return console.error('\x1b[31m', `"${cmd}" is not a valid command.\n`, HELP);
  }

  if(cmd === 'add' && (!key || !value)) {
    return console.error('\x1b[31m', 'key and/or value missing.\n', HELP);
  }

  if(!key) {
    return console.error('\x1b[31m', 'key is missing.\n', HELP);
  }

  if(cmd === 'add') console.log(store.add(key, value));
  if(cmd === 'get') console.log(store.get(key));
  if(cmd === 'remove') console.log(store.remove(key));
}

module.exports = {
  cli,
  HELP
};

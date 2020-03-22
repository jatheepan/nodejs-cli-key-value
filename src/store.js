const path = require('path');
const fs = require('fs');

const storeFile = path.join(__dirname, '.store');
const store = fs.readFileSync(storeFile, 'utf8');
let data = null;

try {
  data = JSON.parse(store);
} catch(e) {
  console.error('\x1b[31m', 'key store tampered');
  process.exit();
}

const add = (key, value) => {
  data[key] = value;
  fs.writeFileSync(storeFile, JSON.stringify(data), {encoding: 'utf8'});
  return data[key];
};

const remove = (key) => {
  if(!data.hasOwnProperty(key)) {
    console.error('\x1b[31m', `key "${key}" does not exist`);
    return;
  }
  delete data[key];
  fs.writeFileSync(storeFile, JSON.stringify(data));
  return data[key];
};

const get = (key) => {
  if(!data.hasOwnProperty(key)) {
    console.error('\x1b[31m', `key "${key}" does not exist`);
    return;
  }
  return data[key];
};

module.exports = {
  add,
  remove,
  get
};

const path = require('path');
const fs = require('fs');
const storeFile = path.join(__dirname, '.store');

const getStore = () => {
  const store = fs.readFileSync(storeFile, 'utf8');
  let data = null;

  try {
    data = JSON.parse(store);
  } catch(e) {
    console.error('\x1b[31m', 'key store tampered');
    data = {};
  }
  return data;
};

const add = (key, value) => {
  const store = getStore();
  store[key] = value;
  fs.writeFileSync(storeFile, JSON.stringify(store), {encoding: 'utf8'});
  return store[key];
};

const remove = (key) => {
  const store = getStore();
  if(!store.hasOwnProperty(key)) {
    console.error('\x1b[31m', `key "${key}" does not exist`);
    return;
  }
  delete store[key];
  fs.writeFileSync(storeFile, JSON.stringify(store));
  return;
};

const get = (key) => {
  const store = getStore();
  if(!store.hasOwnProperty(key)) {
    console.error('\x1b[31m', `key "${key}" does not exist`);
    return;
  }
  return store[key];
};

module.exports = {
  add,
  remove,
  get,
  getStore
};

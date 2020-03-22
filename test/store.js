const fs = require('fs');
const {expect} = require('chai');
const sinon = require('sinon');
const store = require('../src/store');

describe('Store', () => {
  let errorSpy = null;
  let logSpy = null;

  beforeEach(() => {
    errorSpy = sinon.spy(console, 'error');
    logSpy = sinon.spy(console, 'log');
  });
  afterEach(() => {
    errorSpy.restore();
    logSpy.restore();
  });

  describe('getStore', () => {
    describe('when store file content is not parseable', () => {
      it('logs error', () => {
        let readFileSyncStub = sinon.stub(fs, 'readFileSync').returns('invalid json');
        let processExitSpy = sinon.spy(process, 'exit');
        store.getStore();
        expect(errorSpy).calledWith('\x1b[31m', 'key store tampered');
        readFileSyncStub.restore();
        processExitSpy.restore();
      });
    });
  });

  describe('remove', () => {
    describe('when key does not exists', () => {
      it('logs error', () => {
        let getStoreStub = sinon.stub(store, 'getStore').returns({fullname: 'theepan kanthavel'});
        store.remove('name');
        expect(errorSpy).calledWith('\x1b[31m', `key "name" does not exist`);
        getStoreStub.restore();
      });
    });
  });

  describe('get', () => {
    describe('when key does not exists', () => {
      it('logs error', () => {
        let getStoreStub = sinon.stub(store, 'getStore').returns({fullname: 'theepan kanthavel'});
        store.get('name');
        expect(errorSpy).calledWith('\x1b[31m', `key "name" does not exist`);
        getStoreStub.restore();
      });
    });
  });
});

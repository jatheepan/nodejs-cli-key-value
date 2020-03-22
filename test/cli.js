const {expect} = require('chai');
const sinon = require('sinon');
const {cli, HELP} = require('../src/cli');
const store = require('../src/store');

describe('Cli', () => {
  let errorSpy = null;
  let logSpy = null;
  let addSpy = null;
  let removeSpy = null;
  let getSpy = null;
  beforeEach(() => {
    errorSpy = sinon.spy(console, 'error');
    logSpy = sinon.spy(console, 'log');
    addSpy = sinon.spy(store, 'add');
    removeSpy = sinon.spy(store, 'remove');
    getSpy = sinon.spy(store, 'get');
  });
  afterEach(() => {
    errorSpy.restore();
    logSpy.restore();
    addSpy.restore();
    removeSpy.restore();
    getSpy.restore();
  });

  describe('when no command provided', () => {
    it('logs help text', () => {
      cli([null, null, 'help']);
      expect(logSpy).calledOnce;
    });
  });

  describe('help command', () => {
    it('logs help text', () => {
      cli([null, null]);
      expect(logSpy).calledOnce;
    });
  });

  describe('when invalid command provided', () => {
    it('logs error text', () => {
      cli([null, null, 'hello']);
      expect(errorSpy).calledWith('\x1b[31m', `"hello" is not a valid command.\n`, HELP);
    });
  });

  describe('when key and value are missed for "add"', () => {
    it('logs error text', () => {
      cli([null, null, 'add']);
      expect(errorSpy).calledWith('\x1b[31m', 'key and/or value missing.\n', HELP);
    });
  });

  describe('when key is missed for "remove" and "get"', () => {
    it('logs error text', () => {
      cli([null, null, 'get']);
      expect(errorSpy).calledWith('\x1b[31m', 'key is missing.\n', HELP);
    });
  });

  describe('when key is missed for "remove" and "get"', () => {
    it('logs error text', () => {
      cli([null, null, 'get']);
      expect(errorSpy).calledWith('\x1b[31m', 'key is missing.\n', HELP);
    });
  });

  describe('when add', () => {
    it('calls store add method', () => {
      const key = 'sentence';
      const value = 'hello world';
      cli([null, null, 'add', key, value]);
      expect(addSpy).calledWith(key, value);
    });
  });

  describe('when get', () => {
    it('calls store get method', () => {
      const key = 'sentence';
      cli([null, null, 'get', key]);
      expect(getSpy).calledWith(key);
    });
  });

  describe('when remove', () => {
    it('calls store remove method', () => {
      const key = 'sentence';
      cli([null, null, 'remove', key]);
      expect(removeSpy).calledWith(key);
    });
  });
});

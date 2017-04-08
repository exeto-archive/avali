/* eslint-env jest */
/* eslint-disable prefer-rest-params */

'use strict';

const avali = require('./');

test('it should throw error when incorrect arguments', () => {
  expect(() => {
    avali(42);
  }).toThrow('Argument #1: Expected string or array');

  expect(() => {
    avali([], []);
  }).not.toThrow();

  expect(function () {
    avali([], arguments);
  }).not.toThrow();
});

test('it should check args based by specified rules', () => {
  expect(() => {
    avali(['any'], [42]);
  }).not.toThrow();

  expect(() => {
    avali(['any'], [true]);
  }).not.toThrow();

  expect(() => {
    avali(['any'], ['lorem']);
  }).not.toThrow();

  expect(function () {
    avali(['args'], [arguments]);
  }).not.toThrow();

  expect(() => {
    avali(['args'], [42]);
  }).toThrow('Argument #1: Expected arguments');

  expect(() => {
    avali(['arr'], [[42]]);
  }).not.toThrow();

  expect(() => {
    avali(['arr'], [42]);
  }).toThrow('Argument #1: Expected array');

  expect(() => {
    avali(['bool'], [true]);
  }).not.toThrow();

  expect(() => {
    avali(['bool'], [42]);
  }).toThrow('Argument #1: Expected boolean');

  expect(() => {
    avali(['err'], [new Error()]);
  }).not.toThrow();

  expect(() => {
    avali(['err'], [42]);
  }).toThrow('Argument #1: Expected error');

  expect(() => {
    avali(['func'], [() => {}]);
  }).not.toThrow();

  expect(() => {
    avali(['func'], [42]);
  }).toThrow('Argument #1: Expected function');

  expect(() => {
    avali(['nil'], [null]);
  }).not.toThrow();

  expect(() => {
    avali(['nil'], [42]);
  }).toThrow('Argument #1: Expected null');

  expect(() => {
    avali(['undef'], [undefined]);
  }).not.toThrow();

  expect(() => {
    avali(['undef'], [42]);
  }).toThrow('Argument #1: Expected undefined');

  expect(() => {
    avali(['num'], [42]);
  }).not.toThrow();

  expect(() => {
    avali(['num'], ['lorem']);
  }).toThrow('Argument #1: Expected number');

  expect(() => {
    avali(['obj'], [{}]);
  }).not.toThrow();

  expect(() => {
    avali(['obj'], [42]);
  }).toThrow('Argument #1: Expected object');

  expect(() => {
    avali(['obj'], [null]);
  }).toThrow('Argument #1: Expected object');

  expect(() => {
    avali(['str'], ['lorem']);
  }).not.toThrow();

  expect(() => {
    avali(['str'], [42]);
  }).toThrow('Argument #1: Expected string');
});

test('it should check multiple rules', () => {
  expect(() => {
    avali(['str, num'], [42]);
  }).not.toThrow();

  expect(() => {
    avali(['str, num'], ['lorem']);
  }).not.toThrow();

  expect(() => {
    avali(['str, num'], [true]);
  }).toThrow('Argument #1: Expected string or number');
});

test('it should check multiple arguments', () => {
  expect(() => {
    avali(['str', 'num'], ['lorem', 42]);
  }).not.toThrow();

  expect(() => {
    avali(['str', 'num'], [42, 'lorem']);
  }).toThrow('Argument #1: Expected string');

  expect(() => {
    avali(['str', 'num'], ['lorem', 'ipsum']);
  }).toThrow('Argument #2: Expected number');
});

test('it should check non-array arguments', () => {
  expect(() => {
    avali(['str'], 'lorem');
  }).not.toThrow();

  expect(() => {
    avali('str', ['lorem']);
  }).not.toThrow();

  expect(() => {
    avali('str', 'lorem');
  }).not.toThrow();

  expect(() => {
    avali('str', [42]);
  }).toThrow('Argument #1: Expected string');

  expect(() => {
    avali(['str'], 42);
  }).toThrow('Argument #1: Expected string');

  expect(() => {
    avali('str', 42);
  }).toThrow('Argument #1: Expected string');
});

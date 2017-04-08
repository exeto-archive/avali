'use strict';

const is = require('is');
const arrify = require('arrify');

function newException(num, expectedType) {
  const err = new Error(`Argument #${num + 1}: Expected ${expectedType}`);

  if (Error.captureStackTrace) {
    // eslint-disable-next-line no-use-before-define
    Error.captureStackTrace(err, avali);
  }

  return err;
}

const types = {
  any: { type: 'any', check: () => true },
  args: { type: 'arguments', check: is.args },
  arr: { type: 'array', check: is.array },
  bool: { type: 'boolean', check: is.bool },
  err: { type: 'error', check: is.error },
  func: { type: 'function', check: is.fn },
  nil: { type: 'null', check: is.nil },
  undef: { type: 'undefined', check: is.undef },
  num: { type: 'number', check: is.number },
  obj: { type: 'object', check: is.object },
  str: { type: 'string', check: is.string },
};

function humanize(arr) {
  return arr.join(', ').replace(/, ([^,]+)$/, ' or $1');
}

function avali(rules, args) {
  if (!is.string(rules) && !is.array(rules)) {
    throw newException(0, 'string or array');
  }

  rules = arrify(rules);
  args = is.args(args) ? args : arrify(args);

  rules.forEach((rule, index) => {
    const arg = args[index];
    const expectedTypes = [];
    const arr = rule.split(',').map(item => item.toLowerCase().trim());
    let isValid = false;

    for (const key of arr) {
      const { type, check } = types[key];
      expectedTypes.push(type);

      if (check(arg)) {
        isValid = true;
        break;
      }
    }

    if (!isValid) {
      throw newException(index, humanize(expectedTypes));
    }
  });
}

module.exports = avali;

# avali

[![Build Status][buildstat-image]][buildstat-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependency Status][depstat-image]][depstat-url]

> Arguments validation

**THIS PACKAGE IS NO LONGER MAINTAINED**

## Install

```
$ npm install --save avali
```

## Usage

```js
const avali = require('avali');

function something(a, b) {
  avali(['str', 'arr, undef'], arguments);
  // ...
}
```

## API

### avali(rules, args)

#### rules

Type: `array`

Each argument is an array element, which is a string with the valid types listed, separated by commas.

| rule  | description |
| ----- | ----------- |
| any   | any type    |
| str   | string      |
| num   | number      |
| bool  | boolean     |
| func  | function    |
| arr   | array       |
| err   | error       |
| nil   | null        |
| undef | undefined   |
| obj   | object      |
| args  | arguments   |

If necessary, set the optional parameter, use `undef` in together with other types.

#### args

Type: `arguments` or `array`

## License

[MIT](LICENSE.md) © [Timofey Dergachev](https://exeto.me/)

[buildstat-url]: https://travis-ci.org/exeto/avali?branch=master
[buildstat-image]: https://img.shields.io/travis/exeto/avali/master.svg?style=flat-square
[coverage-url]: https://coveralls.io/github/exeto/avali?branch=master
[coverage-image]: https://img.shields.io/coveralls/exeto/avali/master.svg?style=flat-square
[depstat-url]: https://david-dm.org/exeto/avali#info=Dependencies
[depstat-image]: https://img.shields.io/david/exeto/avali.svg?style=flat-square

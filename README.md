# cases

cases provides parameterized unit tests for Mocha.

## Installation

    $ npm install cases

## Quick Start

Using cases is easy. All you need to do is to add a reference to it within your Node.js application:

```javascript
var cases = require('cases');
```

Now you can write your tests using Mocha as usual, but you may introduce cases for tests where you need multiple test cases.

```javascript
test('add returns the sum.', cases([
  [ 23, 42, 65 ],
  [ 12, 17, 29 ]
], function (first, second, expected) {
  var actual = add(first, second);
  assert.that(actual, is.equalTo(expected));
}));
```

This also works with asynchronous tests. The only difference is that you additionally need to provide the `done` parameter to your test function.

```javascript
test('addAsync returns the sum.', cases([
  [ 23, 42, 65 ],
  [ 12, 17, 29 ]
], function (first, second, expected, done) {
  addAsync(first, second, function (actual) {
    assert.that(actual, is.equalTo(expected));
    done();
  });
}));
```

### Non-inline test cases

Instead of providing all the test cases as inline data, you can alternatively specify a function that returns the test cases. This way you can load your test data from a file, a database or any other data source.

```javascript
test('add returns the sum.', cases(function () {
  return [
    [ 23, 42, 65 ],
    [ 12, 17, 29 ]
  ];
}, function (first, second, expected) {
  var actual = add(first, second);
  assert.that(actual, is.equalTo(expected));
}));
```

This also works for asynchronous test functions. Please note that the function that gets the test cases must be synchronous nevertheless.

```javascript
test('add returns the sum.', cases(function () {
  return [
    [ 23, 42, 65 ],
    [ 12, 17, 29 ]
  ];
}, function (first, second, expected, done) {
  addAsync(first, second, function (actual) {
    assert.that(actual, is.equalTo(expected));
    done();
  });
}));
```

## Running the build

This module can be built using [Grunt](http://gruntjs.com/). Besides running the tests, this also analyses the code. To run Grunt, go to the folder where you have installed cases and run `grunt`. You need to have [grunt-cli](https://github.com/gruntjs/grunt-cli) installed.

    $ grunt

## License

The MIT License (MIT)
Copyright (c) 2013-2014 the native web.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

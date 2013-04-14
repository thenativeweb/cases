'use strict';

var assert = require('node-assertthat');

var cases = require('../lib/cases');

suite('cases', function () {
  test('returns a function.', function () {
    var actual = cases([
      [ 23 ]
    ], function (input) {
      input++;
    });
    assert.that(actual, is.ofType('function'));
  });

  suite('synchronous', function () {
    test('returns a function without parameters.', function () {
      var actual = cases([
        [ 23 ]
      ], function (input) {
        input++;
      });
      assert.that(actual.length, is.equalTo(0));
    });

    suite('inline data', function () {
      test('returns a function that runs one test case.', function () {
        var result = 0;
        var actual = cases([
          [ 23 ]
        ], function (input) {
          result += input;
        });
        actual();
        assert.that(result, is.equalTo(23));
      });

      test('returns a function that runs multiple test cases.', function () {
        var result = 0;
        var actual = cases([
          [ 23 ],
          [ 42 ]
        ], function (input) {
          result += input;
        });
        actual();
        assert.that(result, is.equalTo(65));
      });
    });

    suite('function data', function () {
      test('returns a function that runs one test case.', function () {
        var result = 0;
        var actual = cases(function () {
          return [
            [ 23 ]
          ];
        }, function (input) {
          result += input;
        });
        actual();
        assert.that(result, is.equalTo(23));
      });

      test('returns a function that runs multiple test cases.', function () {
        var result = 0;
        var actual = cases(function () {
          return [
            [ 23 ],
            [ 42 ]
          ];
        }, function (input) {
          result += input;
        });
        actual();
        assert.that(result, is.equalTo(65));
      });
    });
  });

  suite('asynchronous', function () {
    test('returns a function with one parameter.', function () {
      var actual = cases([
        [ 23 ]
      ], function (input, done) {
        setTimeout(function () {
          input++;
          done();
        }, 100);
      });
      assert.that(actual.length, is.equalTo(1));
    });

    suite('inline data', function () {
      test('returns a function that runs one test case.', function (done) {
        var result = 0;
        var actual = cases([
          [ 23 ]
        ], function (input, done) {
          result += input;
          done();
        });
        actual(function () {
          assert.that(result, is.equalTo(23));
          done();
        });
      });

      test('returns a function that runs multiple test cases.', function (done) {
        var result = 0;
        var actual = cases([
          [ 23 ],
          [ 42 ]
        ], function (input, done) {
          result += input;
          done();
        });
        actual(function () {
          assert.that(result, is.equalTo(65));
          done();
        });
      });
    });

    suite('function data', function () {
      test('returns a function that runs one test case.', function (done) {
        var result = 0;
        var actual = cases(function () {
          return [
            [ 23 ]
          ];
        }, function (input, done) {
          result += input;
          done();
        });
        actual(function () {
          assert.that(result, is.equalTo(23));
          done();
        });
      });

      test('returns a function that runs multiple test cases.', function (done) {
        var result = 0;
        var actual = cases(function () {
          return [
            [ 23 ],
            [ 42 ]
          ];
        }, function (input, done) {
          result += input;
          done();
        });
        actual(function () {
          assert.that(result, is.equalTo(65));
          done();
        });
      });
    });
  });
});
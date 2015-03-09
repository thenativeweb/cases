'use strict';

var assert = require('assertthat');

var cases = require('../lib/cases');

suite('cases', function () {
  test('returns a function.', function (done) {
    var actual = cases([
      [ 23 ]
    ], function (input) {
      input++;
    });
    assert.that(actual).is.ofType('function');
    done();
  });

  suite('synchronous', function () {
    test('returns a function without parameters.', function (done) {
      var actual = cases([
        [ 23 ]
      ], function (input) {
        input++;
      });
      assert.that(actual.length).is.equalTo(0);
      done();
    });

    suite('inline data', function () {
      test('returns a function that runs one test case.', function (done) {
        var result = 0;
        var actual = cases([
          [ 23 ]
        ], function (input) {
          result += input;
        });
        actual();
        assert.that(result).is.equalTo(23);
        done();
      });

      test('returns a function that runs multiple test cases.', function (done) {
        var result = 0;
        var actual = cases([
          [ 23 ],
          [ 42 ]
        ], function (input) {
          result += input;
        });
        actual();
        assert.that(result).is.equalTo(65);
        done();
      });
    });

    suite('function data', function () {
      test('returns a function that runs one test case.', function (done) {
        var result = 0;
        var actual = cases(function () {
          return [
            [ 23 ]
          ];
        }, function (input) {
          result += input;
        });
        actual();
        assert.that(result).is.equalTo(23);
        done();
      });

      test('returns a function that runs multiple test cases.', function (done) {
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
        assert.that(result).is.equalTo(65);
        done();
      });
    });
  });

  suite('asynchronous', function () {
    test('returns a function with one parameter.', function (done) {
      var actual = cases([
        [ 23 ]
      ], function (input, doneCases) {
        setTimeout(function () {
          input++;
          doneCases();
        }, 100);
      });
      assert.that(actual.length).is.equalTo(1);
      done();
    });

    suite('inline data', function () {
      test('returns a function that runs one test case.', function (done) {
        var result = 0;
        var actual = cases([
          [ 23 ]
        ], function (input, doneCases) {
          result += input;
          doneCases();
        });
        actual(function () {
          assert.that(result).is.equalTo(23);
          done();
        });
      });

      test('returns a function that runs multiple test cases.', function (done) {
        var result = 0;
        var actual = cases([
          [ 23 ],
          [ 42 ]
        ], function (input, doneCases) {
          result += input;
          doneCases();
        });
        actual(function () {
          assert.that(result).is.equalTo(65);
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
        }, function (input, doneCases) {
          result += input;
          doneCases();
        });
        actual(function () {
          assert.that(result).is.equalTo(23);
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
        }, function (input, doneCases) {
          result += input;
          doneCases();
        });
        actual(function () {
          assert.that(result).is.equalTo(65);
          done();
        });
      });
    });
  });
});

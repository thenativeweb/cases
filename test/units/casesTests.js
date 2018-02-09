'use strict';

const assert = require('assertthat');

const cases = require('../../lib/cases');

suite('cases', () => {
  test('returns a function.', done => {
    /* eslint-disable no-unused-vars */
    const actual = cases([
      [ 23 ]
    ], input => {
      // Intentionally left blank.
    });
    /* eslint-enable no-unused-vars */

    assert.that(actual).is.ofType('function');
    done();
  });

  suite('synchronous', () => {
    test('returns a function without parameters.', done => {
      /* eslint-disable no-unused-vars */
      const actual = cases([
        [ 23 ]
      ], input => {
        // Intentionally left blank.
      });
      /* eslint-enable no-unused-vars */

      assert.that(actual.length).is.equalTo(0);
      done();
    });

    suite('inline data', () => {
      test('returns a function that runs one test case.', done => {
        let result = 0;

        const actual = cases([
          [ 23 ]
        ], input => {
          result += input;
        });

        actual();
        assert.that(result).is.equalTo(23);
        done();
      });

      test('returns a function that runs multiple test cases.', done => {
        let result = 0;

        const actual = cases([
          [ 23 ],
          [ 42 ]
        ], input => {
          result += input;
        });

        actual();
        assert.that(result).is.equalTo(65);
        done();
      });
    });

    suite('function data', () => {
      test('returns a function that runs one test case.', done => {
        let result = 0;

        const actual = cases(() => [
          [ 23 ]
        ], input => {
          result += input;
        });

        actual();
        assert.that(result).is.equalTo(23);
        done();
      });

      test('returns a function that runs multiple test cases.', done => {
        let result = 0;

        const actual = cases(() => [
          [ 23 ],
          [ 42 ]
        ], input => {
          result += input;
        });

        actual();
        assert.that(result).is.equalTo(65);
        done();
      });
    });
  });

  suite('asynchronous', () => {
    test('returns a function with one parameter.', done => {
      const actual = cases([
        [ 23 ]
      ], (input, doneCases) => {
        setTimeout(() => {
          input += 1;
          doneCases();
        }, 100);
      });

      assert.that(actual.length).is.equalTo(1);
      done();
    });

    suite('inline data', () => {
      test('returns a function that runs one test case.', done => {
        let result = 0;

        const actual = cases([
          [ 23 ]
        ], (input, doneCases) => {
          result += input;
          doneCases();
        });

        actual(() => {
          assert.that(result).is.equalTo(23);
          done();
        });
      });

      test('returns a function that runs multiple test cases.', done => {
        let result = 0;

        const actual = cases([
          [ 23 ],
          [ 42 ]
        ], (input, doneCases) => {
          result += input;
          doneCases();
        });

        actual(() => {
          assert.that(result).is.equalTo(65);
          done();
        });
      });
    });

    suite('function data', () => {
      test('returns a function that runs one test case.', done => {
        let result = 0;

        const actual = cases(() => [
          [ 23 ]
        ], (input, doneCases) => {
          result += input;
          doneCases();
        });

        actual(() => {
          assert.that(result).is.equalTo(23);
          done();
        });
      });

      test('returns a function that runs multiple test cases.', done => {
        let result = 0;

        const actual = cases(() => [
          [ 23 ],
          [ 42 ]
        ], (input, doneCases) => {
          result += input;
          doneCases();
        });

        actual(() => {
          assert.that(result).is.equalTo(65);
          done();
        });
      });
    });
  });
});

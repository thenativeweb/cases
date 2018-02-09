'use strict';

const async = require('async');

const cases = function (data, fn) {
  if (typeof data === 'function') {
    return cases(data(), fn);
  }

  const isAsync = data[0].length !== fn.length;

  if (isAsync) {
    return function (done) {
      async.eachSeries(data, (values, callback) => {
        fn(...values.concat(callback));
      }, () => {
        if (done) {
          return done();
        }
      });
    };
  }

  return function () {
    for (let i = 0; i < data.length; i++) {
      fn(...data[i]);
    }
  };
};

module.exports = cases;

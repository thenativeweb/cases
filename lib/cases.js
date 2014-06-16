'use strict';

var async = require('async');

var cases = function (data, fn) {
  if (typeof data === 'function') {
    return cases(data(), fn);
  }

  var isAsync = (data[0].length !== fn.length);

  if (isAsync) {
    return function (done) {
      async.eachSeries(data, function (values, callback) {
        fn.apply(null, values.concat(callback));
      }, function () {
        if (done) {
          done();
        }
      });
    };
  }

  return function () {
    var i;
    for (i = 0; i < data.length; i++) {
      fn.apply(null, data[i]);
    }
  };
};

module.exports = cases;

'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var async = require('async');

var cases = function cases(data, fn) {
  if (typeof data === 'function') {
    return cases(data(), fn);
  }

  var isAsync = data[0].length !== fn.length;

  if (isAsync) {
    return function (done) {
      async.eachSeries(data, function (values, callback) {
        fn.apply(undefined, _toConsumableArray(values.concat(callback)));
      }, function () {
        if (done) {
          return done();
        }
      });
    };
  }

  return function () {
    for (var i = 0; i < data.length; i++) {
      fn.apply(undefined, _toConsumableArray(data[i]));
    }
  };
};

module.exports = cases;
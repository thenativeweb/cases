'use strict';

var async = require('async');

var cases = function (cases, fn) {
  var isAsync = (cases[0].length !== fn.length);

  if (isAsync) {
    return function (done) {
      async.eachSeries(cases, function (values, callback) {
        fn.apply(null, values.concat(callback));
      }, function () {
        if (done) { done(); }
      });
    };
  }

  return function () {
    for (var i = 0; i < cases.length; i++) {
      fn.apply(null, cases[i]);
    }
  };
};

module.exports = cases;
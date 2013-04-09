'use strict';

var async = require('async');

var run = function (cases, fn, done) {
  async.eachSeries(cases, function (values, callback) {
    fn.apply(null, values.concat(callback));
  }, function () {
    if (done) { done(); }
  });
};

var cases = function (cases, fn) {
  var isAsync = (cases[0].length !== fn.length);

  if (isAsync) {
    return function (done) {
      run(cases, fn, done);
    };
  }

  return function () {
    run(cases, fn);
  };
};

module.exports = cases;
'use strict';

(function() {

    function define_cases() {
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
        return cases;
    }

    if (typeof module !== 'undefined' && typeof module.exports !== 'underfined') {
        module.exports = define_cases();
    } else if (typeof define === 'function' && define.amd) {
        define(['async'], function() {
            return define_cases();
        });
    } else {
        window.cases = define_cases();
    }
})();

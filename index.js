var through = require('through');

/**
 * Holds the promise interface
 * @type {{promises: Array, promisecallback: Function, makePromises: Function}}
 */
var promise = {
  /**
   * The list of promises being made
   */
  promises: [],

  /**
   * The callback to fire at the end
   */
  promisecallback: function() {},

  /**
   * Make a set of promises
   * @param promises
   * @param callback
   */
  makePromises: function (promises, callback) {
    this.promises = promises;
    this.promisecallback = callback;
  },

  /**
   * Deliver a promise
   * @param promise
   * @returns {*}
   */
  deliverPromise: function (promise) {
    var prom = this.promises,
      cb = this.promisecallback;

    return through(function (file) {

    }, function () {

      for (var i = 0; i < prom.length; i++) {
        if (prom[i] == promise) {
          prom.splice(i--, 1);
        }
      }
      if (prom.length === 0) {
        cb();
      }

      this.emit('end');
    });
  }
};

/**
 * Expose the API
 */
module.exports = promise;
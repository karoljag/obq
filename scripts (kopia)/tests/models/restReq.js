var Q = require('q'),
  utils = require('./utils.js'),
  rest = require('restler'),
  colors = require('colors');

var optDefault = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': process.env.token || 'none'
  }
}

function req(reqData) {

  utils.log(utils.getTime(), 'HTTP'.cyan, '[REQ]'.yellow, reqData.method.toUpperCase(), reqData.url);

  var deffered = Q.defer(),
    currentWaiter = false;

  runs(function () {

    var opts = {
      timeout: 4500
    };

    if (reqData.body) {
      try {
        opts.data = JSON.stringify(reqData.body);
      } catch (e) {
        opts.data = reqData.body;
      }
    }

    opts.headers = optDefault.headers;

    rest[reqData.method](reqData.url, opts)
      .on('complete', function (result, response) {
        currentWaiter = true;
        if (!response) {
          console.log('HTTP'.cyan, '[ERROR]'.red, 'No response '.red + colors.magenta(reqData.url) + ' ->'.red, result);
        }
        if (response.statusCode >= 400) {
          console.log('HTTP'.cyan, '[ERROR]'.red, 'Error response ['.red + colors.magenta(reqData.method.toUpperCase()) + ' ' + colors.magenta(reqData.url) + '] ['.red + colors.magenta(response.statusCode) + '] ->'.red, result);
        } else {
          utils.log(utils.getTime(), 'HTTP'.cyan, '[SUCCESS]'.green, reqData.method.toUpperCase(), reqData.url);
        }
        deffered.resolve({result: result, response: response});
      })
      .on('timeout', function (ms) {
        utils.log('HTTP'.cyan, '[ERROR]'.red, colors.red('did not return within ' + ms + ' ms / ' + ' ' + reqData.method + ' / ' + reqData.url));
      })
  })

  waitsFor(function () {
    return currentWaiter;
  }, 'request timeout', 6000);

  return deffered.promise;

}

module.exports = req;
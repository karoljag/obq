var fs = require('fs'),
  path = require('path'),
  uglifyJs = require('uglify-js'),
  randomString = require('random-string'),
  moment = require('moment'),
  _ = require('lodash'),
  colors = require('colors');

var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
  escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
  meta = { // table of character substitutions
    '\b': '\\b',
    '\t': '\\t',
    '\n': '\\n',
    '\f': '\\f',
    '\r': '\\r',
    '"': '\\"',
    '\\': '\\\\'
  };

var waitPromises = {},
  logName = '',
  pauseTime = process.env.pause || 2000;

function json_quote(string) {
  escapable.lastIndex = 0;
  return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
    var c = meta[a];
    return typeof c === 'string' ? c :
    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
  }) + '"' : '"' + string + '"';
}

module.exports = {

  getCode: function (filename) {
    var code = fs.readFileSync(path.resolve('../scripts', filename + '.js'), 'utf8'),
      codeMin = uglifyJs.minify(code, {
        fromString: true,
        output: {
          beautify: true
        }
      }),
    //codeMin = uglifyJs.minify(code, {fromString:true}),
      codeMinString = codeMin.code;

    return codeMinString;
  },

  getUsername: function () {
    return 'testUser_' + randomString({length: 20});
  },

  getActionName: function () {
    return 'action_' + randomString({length: 20});
  },

  getTagName: function () {
    return 'tag_' + randomString({length: 20});
  },

  getBadgeName: function () {
    return 'badge_' + randomString({length: 20});
  },

  getLbName: function () {
    return 'lb_' + randomString({length: 20});
  },

  genCollection: function (objOrFn, len) {
    var _res = [],
      obj = {},
      isFn = _.isFunction(objOrFn),
      isObj = _.isPlainObject(objOrFn);

    if (isObj) {
      obj = objOrFn;
    }

    while (len--) {
      if (isFn) {
        obj = objOrFn(len);
      }
      _res.push(obj);
    }
    return _res;
  },

  wait: function (action, timeVal) {

    var promiseName = 'wait_' + randomString({length: 20});
    waitPromises[promiseName] = false;

    runs(function () {
      setTimeout(function () {
        waitPromises[promiseName] = true;
      }, timeVal);
    })

    waitsFor(function () {
      return waitPromises[promiseName];
    }, 'IC timeout', timeVal + 300);

    runs(action)
  },

  pauseForEngine: function (pauseValue) {
    pauseValue = pauseValue && pauseValue > pauseTime ? pauseValue : pauseTime;
    this.log(this.getTime(), 'Pause for engine'.green, colors.yellow(pauseValue + 'ms'));
    this.wait(function () {
    }, pauseValue);
  },

  getTime: function () {
    return moment().format('YYYY/MM/DD HH:mm:ss:SSS');
  },

  log: function () {
    //[].unshift.call(arguments, colors.yellow('['+logName+']'));
    console.log.apply(this, arguments);
  }

}
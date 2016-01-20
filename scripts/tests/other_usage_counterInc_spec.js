var utils = require('./models/utils.js'),
  runner = require('./models/runner.js'),
  restReq = require('./models/restReq.js'),
  _ = require('lodash');

var URL = process.env.url,
  tagName = utils.getTagName();

runner.setup({url: URL});

var scriptName = 'other_usage_counterInc';

/*
  1. dodać tag, usera,
  2. ustawić, że zalogowany wczoraj i dzisiaj
  3. powinien dodawać counter
  

  1. event
  2. wczoraj bylo logowanie
  3. counter inc
*/

describe(scriptName + ' script', function () {

  describe('tag creator', function () {

    it('should create new tag and set it to the runner instance', function () {
      runner.one('tag creator')
        .createTag(tagName)
        .finalTest(function () {
          runner.setup({tag: tagName});
        })
        .run()
    })

  })

  describe('action updater', function () {

    it('should parse script file and update action at ' + URL, function () {

      runner.one()
        .action({
          name: scriptName,
          code: utils.getCode(scriptName),
          arguments: ["name==loggedIn"]
        })
        .run()

    })

  })
  var scriptTmpActName = utils.getActionName(),
      yestDate = new Date();
      yestDate.setDate(yestDate.getDate() - 1);
      var yestDateISO = new Date(yestDate).toISOString();
  describe('last login setter', function () {

    it('should set last login date to yesterday', function () {

      runner.one()
        .action({
          name: scriptTmpActName,
          code: '$self.properties().put("lastLogin", "'+yestDateISO+'")',
          arguments: ["name=="+scriptTmpActName]
        })
        .run()        

    })

  })

  var userName1 = utils.getUsername(),
      testCounterName = 'usage';

  describe('[runner] logic', function () {

    it('should run tmp action ', function () {

      runner.one('invoke script')
        .createUser(userName1)
        .events([
          {
            body: {
              name: scriptTmpActName
            }, tags: [tagName]
          }
        ])
        .finalTest(function () {

          restReq({
            url: URL + '/users/' + userName1,
            method: 'get'
          }).then(function (res) {            
            console.log('last login: '+res.result.lastLogin);
            console.log('yest: '+yestDateISO);
            expect(res.result.lastLogin).toEqual(yestDateISO);
          });

        })
        .run();

    })
  })  

  var userName1 = utils.getUsername(),
      testCounterName = 'usage';

  describe('[runner] logic', function () {

    it('should set '+ testCounterName +'counter to 1 ', function () {

      runner.one('invoke script')
        .user(userName1)
        .events([
          {
            body: {
              name: 'loggedIn'
            }, tags: [tagName]
          }
        ])
        .finalTest(function () {

          restReq({
            url: URL + '/users/' + userName1 + '/counters',
            method: 'get'
          }).then(function (res) {
            var _res = _.object(_.map(res.result, function (x) {
              return [x.name, x.value]
            }));
            console.log(_res);

            // expect(res.result).toEqual(jasmine.any(Array));
            // expect(_res).toEqual(jasmine.any(Object));
            expect(_res.usage).toBe(1);

          });

        })
        .run();

    })
  })

});
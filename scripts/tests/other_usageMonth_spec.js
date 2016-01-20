var utils = require('./models/utils.js'),
  runner = require('./models/runner.js'),
  restReq = require('./models/restReq.js'),
  _ = require('lodash');

var URL = process.env.url,
  tagName = utils.getTagName();

runner.setup({url: URL});

var scriptName = 'other_usage';
/* 
 set counter to 7
 check achievement
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
          arguments: ["$CounterIncremented.counterName==usage"]
        })
        .run()

    })

  })
  function monthsAgoDay(months) {
    var today = new Date(),
      monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth()-months);

    if(monthAgo.getMonth() !== today.getMonth()-months){
      monthAgo.setDate(0);
    }

    return monthAgo;
  }
  var today = new Date(),
    monthAgoDay = monthsAgoDay(1),
    diffMonth =  Math.round((today.getTime() - monthAgoDay.getTime())  / 86400000);

  var scriptIncName = utils.getActionName(),
    scriptSetCounterName = utils.getActionName(),
    testCounterName = 'usage';

  describe('tmp action adder', function () {

    it('should add new script ' + scriptSetCounterName + ' that set counter ' + testCounterName + ' to '+diffMonth-1+' at ' + URL, function () {

      runner.one()
        .action({
          name: scriptSetCounterName,
          code: '$self.counters().add("' + testCounterName + '", '+(diffMonth-1)+');',
          arguments: [scriptSetCounterName]
        })
        .run()

    })

    it('should add new script ' + scriptIncName + ' that increment counter ' + testCounterName + ' at ' + URL, function () {

      runner.one()
        .action({
          name: scriptIncName,
          code: '$self.counters().inc("' + testCounterName + '");',
          arguments: [scriptIncName]
        })
        .run()

    })

  })

  var userName1 = utils.getUsername(),
    testAchName = 'regularUser3';

  describe('achievements', function () {

    it('should add achievement '+testAchName, function () {

      runner.one()
        .achievement({name: testAchName})
        .run();

    })

  })


  var eventSetCounter = {body: {}, tags: [tagName]};
  eventSetCounter.body[scriptSetCounterName] = true;
  var eventIncCounter = {body: {}, tags: [tagName]};
  eventIncCounter.body[scriptIncName] = true;

  var events = [eventSetCounter, eventIncCounter];

  describe('[runner] logic', function () {

    it('send 2 events [(#1- ' + scriptSetCounterName + ' that add counter ' + testCounterName + ' and set it to 30), (#2- ' + scriptIncName + ' that increase counter ' + testCounterName + ')] and earn achievement regularUser3', function () {

      runner.one('invoke script')
        .createUser(userName1)
        .events(events)
        .finalTest(function () {

          restReq({
            url: URL + '/users/' + userName1 + '/counters',
            method: 'get'
          }).then(function (res) {

            var _res = _.object(_.map(res.result, function (x) {
              return [x.name, x.value]
            }));

            expect(_res.usage).toBe(diffMonth);

            return restReq({
              url: URL + '/users/' + userName1 + '/achievements?limit=999',
              method: 'get'
            })

          }).then(function (res) {
            var keys = _.pluck(res.result, 'id');
            expect(keys).toContain(testAchName);
          });

        })
        .run();

    })
  })

});
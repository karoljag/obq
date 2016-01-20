var utils = require('./models/utils.js'),
  runner = require('./models/runner.js'),
  restReq = require('./models/restReq.js'),
  _ = require('lodash');

var URL = process.env.url,
  tagName = utils.getTagName();

runner.setup({url: URL});

var scriptName = 'freq_pretest';

describe(scriptName + ' script', function () {

  describe('tag creator', function () {

    it('should create new tag and set it to the runner instance', function () {
      runner.one('tag creator')
        .createTag(tagName).createTag('badgesWithProgress')
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
          arguments: [
            "$CounterIncremented.counterName==brewPretest"
          ]
        })
        .action({
          name: 'system_badgesWithProgress',
          code: utils.getCode('system_badgesWithProgress'),
          arguments: ["handleBadgesWithProgress", "badgeName", "badgeLevels"],
          tagName: 'badgesWithProgress'
        })
        .run()

    })

  })

  var scriptIncName = utils.getActionName(),
    scriptSetCounterName = utils.getActionName(),
    testCounterName = 'brewPretest';

  describe('tmp action adder', function () {

    it('should add new script ' + scriptSetCounterName + ' that set counter ' + testCounterName + ' to 14 at ' + URL, function () {

      runner.one()
        .action({
          name: scriptSetCounterName,
          code: '$self.counters().add("' + testCounterName + '", 14);',
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

  describe('achievements', function () {

    it('should add achievements brewPretest_{level}', function () {

      runner.one()
        .achievement({name: 'VIP_flavor_1'})
        .achievement({name: 'VIP_flavor_2'})
        .achievement({name: 'VIP_flavor_3'})
        .achievement({name: 'VIP_flavor_4'})
        .run();

    })

  })

  var userName1 = utils.getUsername();

  describe('[runner] logic', function () {

    var eventSetCounter = {body: {}, tags: [tagName]};
    eventSetCounter.body[scriptSetCounterName] = true;
    var eventIncCounter = {body: {}, tags: [tagName]};
    eventIncCounter.body[scriptIncName] = true;

    var events = [eventSetCounter, eventIncCounter];

    it('send 2 events [(#1- ' + scriptSetCounterName + ' that add counter ' + testCounterName + ' and set it to 14), (#2- ' + scriptIncName + ' that increase counter ' + testCounterName + ')] and earn achievements brewPretest_amountXX', function () {

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

            expect(res.result).toEqual(jasmine.any(Array));
            expect(_res).toEqual(jasmine.any(Object));

            expect(_res.brewPretest).toBe(15);

            return restReq({
              url: URL + '/users/' + userName1 + '/achievements?limit=999',
              method: 'get'
            })

          }).then(function (res) {

            var keys = _.pluck(res.result, 'id');

            expect(keys).toContain('VIP_flavor_1');
            expect(keys).toContain('VIP_flavor_2');
            expect(keys).toContain('VIP_flavor_3');
            expect(keys).toContain('VIP_flavor_4');

          });

        })
        .run();

    })
  })


});
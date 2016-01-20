var utils = require('./models/utils.js'),
  runner = require('./models/runner.js'),
  restReq = require('./models/restReq.js'),
  _ = require('lodash');

var URL = process.env.url,
  tagName = utils.getTagName();

runner.setup({url: URL});

var scriptName = 'freq_brewCoffee';

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
            "$CounterIncremented.counterName==brewCoffee"
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
    testCounterName = 'brewCoffee';

  describe('tmp action adder', function () {

    it('should add new script ' + scriptSetCounterName + ' that set counter ' + testCounterName + ' to 499 at ' + URL, function () {

      runner.one()
        .action({
          name: scriptSetCounterName,
          code: '$self.counters().add("' + testCounterName + '", 499);',
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

    it('should add achievements brewCoffee_{level}', function () {

      runner.one()
        .achievement({name: 'brewCoffee_amount10'})
        .achievement({name: 'brewCoffee_amount20'})
        .achievement({name: 'brewCoffee_amount30'})
        .achievement({name: 'brewCoffee_amount40'})
        .achievement({name: 'brewCoffee_amount50'})
        .achievement({name: 'brewCoffee_amount60'})
        .achievement({name: 'brewCoffee_amount70'})
        .achievement({name: 'brewCoffee_amount80'})
        .achievement({name: 'brewCoffee_amount90'})
        .achievement({name: 'brewCoffee_amount100'})
        .achievement({name: 'brewCoffee_amount110'})
        .achievement({name: 'brewCoffee_amount120'})
        .achievement({name: 'brewCoffee_amount130'})
        .achievement({name: 'brewCoffee_amount140'})
        .achievement({name: 'brewCoffee_amount150'})
        .achievement({name: 'brewCoffee_amount200'})
        .achievement({name: 'brewCoffee_amount250'})
        .achievement({name: 'brewCoffee_amount300'})
        .achievement({name: 'brewCoffee_amount400'})
        .achievement({name: 'brewCoffee_amount500'})
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

    it('send 2 events [(#1- ' + scriptSetCounterName + ' that add counter ' + testCounterName + ' and set it to 499), (#2- ' + scriptIncName + ' that increase counter ' + testCounterName + ')] and earn achievements brewCoffee_amountXX', function () {

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

            expect(_res.brewCoffee).toBe(500);

            return restReq({
              url: URL + '/users/' + userName1 + '/achievements?limit=999',
              method: 'get'
            })

          }).then(function (res) {

            var keys = _.pluck(res.result, 'id');

            expect(keys).toContain('brewCoffee_amount10');
            expect(keys).toContain('brewCoffee_amount20');
            expect(keys).toContain('brewCoffee_amount30');
            expect(keys).toContain('brewCoffee_amount40');
            expect(keys).toContain('brewCoffee_amount50');
            expect(keys).toContain('brewCoffee_amount60');
            expect(keys).toContain('brewCoffee_amount70');
            expect(keys).toContain('brewCoffee_amount80');
            expect(keys).toContain('brewCoffee_amount90');
            expect(keys).toContain('brewCoffee_amount100');
            expect(keys).toContain('brewCoffee_amount110');
            expect(keys).toContain('brewCoffee_amount120');
            expect(keys).toContain('brewCoffee_amount130');
            expect(keys).toContain('brewCoffee_amount140');
            expect(keys).toContain('brewCoffee_amount150');
            expect(keys).toContain('brewCoffee_amount200');
            expect(keys).toContain('brewCoffee_amount250');
            expect(keys).toContain('brewCoffee_amount300');
            expect(keys).toContain('brewCoffee_amount400');
            expect(keys).toContain('brewCoffee_amount500');

          });

        })
        .run();

    })
  })


});
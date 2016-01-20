var utils = require('./models/utils.js'),
  runner = require('./models/runner.js'),
  restReq = require('./models/restReq.js'),
  _ = require('lodash');

var URL = process.env.url,
  tagName = utils.getTagName();

runner.setup({url: URL});

var scriptName = 'system_level';

describe(scriptName + ' script', function () {

  var badgeList = utils.genCollection(function () {
    return {
      name: utils.getBadgeName()
    }
  }, 70);

  describe('tag creator', function () {

    it('should create new tag and set it to the runner instance', function () {
      runner.one('tag creator')
        .createTag(tagName)
        .createTag('badgesWithProgress')
        .finalTest(function () {
          runner.setup({tag: tagName});
        })
        .run()
    })

  });

  describe('action updater', function () {

    it('should parse script file and update action at ' + URL, function () {

      runner.one('update action')
        .action({
          name: scriptName,
          code: utils.getCode(scriptName),
          arguments: ["$AchievementAdded"]
        })
        .run()
    })

  });

  var scriptAddBadge = utils.getActionName();

  describe('tmp action adder', function () {

    it('should add new script ' + scriptAddBadge + ' adds badges by id at ' + URL, function () {

      runner.one('add tmp action')
        .action({
          name: scriptAddBadge,
          code: '$self.achievements().earn($event.badgeId);',
          arguments: [scriptAddBadge]
        })
        .run()
    })

  });

  describe('achievements', function () {

    it('should add all test achievements', function () {

      runner.one('add achievements')
        .achievements(badgeList)
        .run();

    })

  });

  describe('[runner] earn 55 badges', function () {

    var events = utils.genCollection(function (i) {

      // generate event for every badge

      var event = {
        body: {
          badgeId: badgeList[i].name
        }, tags: [tagName]
      };

      event.body[scriptAddBadge] = true;

      return event;
    }, 55);

    it('shoud set level to 4 and toNextLevel to 10', function () {
      runner.one('earn badges')
        .createUser(utils.getUsername())
        .events(events)
        .finalTest(function () {

          var self = this;

          restReq({
            url: URL+'/users/'+self.userName+'/counters',
            method: 'get'
          }).then(function (res) {

            var _res = _.object(_.map(res.result, function(x){return [x.name, x.value]}));

            expect(res.result).toEqual(jasmine.any(Array));
            expect(_res).toEqual(jasmine.any(Object));

            expect(_res.level).toBe(4);
            expect(_res.toNextLevel).toBe(10);

            return restReq({
              url: URL + '/users/' + self.userName + '/notifications',
              method: 'get'
            })

          }).then(function (res) {

            expect(res.result).toEqual(jasmine.any(Array));
            expect(res.result.length).toBe(3);

          });

        })
        .run();
    })
  });

  describe('[runner] earn 36 badges', function () {

    var events = utils.genCollection(function (i) {

      // generate event for every badge

      var event = {
        body: {
          badgeId: badgeList[i].name
        }, tags: [tagName]
      };

      event.body[scriptAddBadge] = true;

      return event;
    }, 36);

    it('shoud set level to 3 and toNextLevel to 14', function () {
      runner.one('earn badges')
        .createUser(utils.getUsername())
        .events(events)
        .finalTest(function () {

          var self = this;

          restReq({
            url: URL+'/users/'+self.userName+'/counters',
            method: 'get'
          }).then(function (res) {

            var _res = _.object(_.map(res.result, function(x){return [x.name, x.value]}));

            expect(res.result).toEqual(jasmine.any(Array));
            expect(_res).toEqual(jasmine.any(Object));

            expect(_res.level).toBe(3);
            expect(_res.toNextLevel).toBe(14);

            return restReq({
              url: URL + '/users/' + self.userName + '/notifications',
              method: 'get'
            })

          }).then(function (res) {

            expect(res.result).toEqual(jasmine.any(Array));
            expect(res.result.length).toBe(2);

          });
        })
        .run();
    })
  });

  describe('[runner] earn 66 badges', function () {

    var events = utils.genCollection(function (i) {

      // generate event for every badge

      var event = {
        body: {
          badgeId: badgeList[i].name
        }, tags: [tagName]
      };

      event.body[scriptAddBadge] = true;

      return event;
    }, 66);

    it('shoud set level to 5 and toNextLevel to 14', function () {
      runner.one('earn badges')
        .createUser(utils.getUsername())
        .events(events)
        .finalTest(function () {

          var self = this;

          restReq({
            url: URL+'/users/'+self.userName+'/counters',
            method: 'get'
          }).then(function (res) {

            var _res = _.object(_.map(res.result, function(x){return [x.name, x.value]}));

            expect(res.result).toEqual(jasmine.any(Array));
            expect(_res).toEqual(jasmine.any(Object));

            expect(_res.level).toBe(5);
            expect(_res.toNextLevel).toBe(14);

            return restReq({
              url: URL + '/users/' + self.userName + '/notifications',
              method: 'get'
            })

          }).then(function (res) {

            expect(res.result).toEqual(jasmine.any(Array));
            expect(res.result.length).toBe(4);

          });
        })
        .run();
    })
  });

});
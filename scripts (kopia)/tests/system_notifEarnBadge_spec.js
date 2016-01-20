var utils = require('./models/utils.js'),
  runner = require('./models/runner.js'),
  restReq = require('./models/restReq.js'),
  _ = require('lodash');

var URL = process.env.url,
  tagName = utils.getTagName();

runner.setup({url: URL});

var scriptName = 'system_notifEarnBadge';

describe(scriptName + ' script', function () {

  var badgeList = utils.genCollection(function () {
    return {
      name: utils.getBadgeName()
    }
  }, 20);

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
          arguments: ["$AchievementAdded"]
        })
        .run()
    })

  })

  var scriptAddBadge = utils.getActionName();

  describe('tmp action adder', function () {

    it('should add new script ' + scriptAddBadge + ' adds badges by id at ' + URL, function () {

      runner.one()
        .action({
          name: scriptAddBadge,
          code: '$self.achievements().earn($event.badgeId);',
          arguments: [scriptAddBadge]
        })
        .run()

    })

  })

  describe('achievements', function () {

    it('should add all test achievements', function () {

      runner.one()
        .achievements(badgeList)
        .run();

    })

  })

  describe('[runner] earn 2 badges', function () {

    var events = utils.genCollection(function (i) {

      // generate event for every badge

      var event = {
        body: {
          badgeId: badgeList[i].name
        }, tags: [tagName]
      };

      event.body[scriptAddBadge] = true;

      return event;
    }, 2);

    it('shoud ...', function () {
      runner.one('earn badges')
        .createUser(utils.getUsername())
        .events(events)
        .finalTest(function () {

          var self = this;

          restReq({
            url: URL + '/users/' + self.userName + '/notifications',
            method: 'get'
          }).then(function (res) {

            expect(res.result.length).toBe(2);

          });

        })
        .run();

    })

  });

  // describe('[runner] earn 20 badges', function () {

  //   var events = utils.genCollection(function (i) {

  //     // generate event for every badge

  //     var event = {body: {
  //       badgeId: badgeList[i].name
  //     }, tags: [tagName]};

  //     event.body[scriptAddBadge] = true;

  //     return event;
  //   }, 20);

  //   it('shoud earn 20 badges', function () {
  //     runner.one('earn badges')
  //     .createUser(utils.getUsername())
  //     .events(events)
  //     .finalTest(function () {

  //       var self = this;

  //       restReq({
  //         url: URL+'/users/'+self.userName+'/notifications?limit=999',
  //         method: 'get'
  //       }).then(function (res) {

  //         expect(res.result.length).toBe(20);

  //       });

  //     })
  //     .run();

  //   })

  // });

})
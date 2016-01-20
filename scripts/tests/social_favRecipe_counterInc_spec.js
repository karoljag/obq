var utils = require('./models/utils.js'),
  runner = require('./models/runner.js'),
  restReq = require('./models/restReq.js'),
  _ = require('lodash');

var URL = process.env.url,
  tagName = utils.getTagName();

runner.setup({url: URL});

var scriptName = 'social_favRecipe_counterInc';

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
          arguments: [
            "name==favRecipe"
          ]
        })
        .run()

    })

  })

  var counterName = 'favRecipe';

  describe('10x fav a recipe', function () {

    it('should set counter ' + counterName + ' to 10', function () {

      var events = utils.genCollection({
        body: {
          name: "favRecipe"
        },
        tags: [tagName]
      }, 10);

      runner.one('send 10x event')
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

            expect(_res[counterName]).toBe(10);

          });

        })
        .run();

    })

  })


});
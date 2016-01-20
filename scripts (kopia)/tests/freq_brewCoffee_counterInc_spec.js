var utils = require('./models/utils.js'),
  runner = require('./models/runner.js'),
  restReq = require('./models/restReq.js'),
  _ = require('lodash');

var URL = process.env.url,
  tagName = utils.getTagName();

runner.setup({url: URL});

var scriptName = 'freq_brewCoffee_counterInc';

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
            "name==brew"
          ]
        })
        .run()

    })

  })

  var counterName = 'brewCoffee';

  describe('10x brew coffee event', function () {

    it('should set counters ' + counterName + ' to 10', function () {

      var events = utils.genCollection({
        body: {
          name: "brew"
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

  var counterMilkConsume = 'milkConsume';

  describe('3x coffee with milk event', function () {

    it('should set counters ' + counterMilkConsume + ' to 6', function () {

      var events = utils.genCollection({
        body: {
          name: "brew",
          brewed: {
            milkAmount: 2
          }
        },
        tags: [tagName]
      }, 3);

      runner.one('send 3x event')
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

            expect(_res[counterMilkConsume]).toBe(6);

          });

        })
        .run();

    })

  })

  var counterPretest = 'brewPretest';

  describe('3x coffee pretest', function () {

    it('should set counters ' + counterPretest + ' to 4', function () {

      var events = utils.genCollection({
        body: {
          name: "brew",
          recipe: {
            pretest: 1
          }
        },
        tags: [tagName]
      }, 4);

      runner.one('send 4x event')
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

            expect(_res[counterPretest]).toBe(4);

          });

        })
        .run();

    })

  })


});
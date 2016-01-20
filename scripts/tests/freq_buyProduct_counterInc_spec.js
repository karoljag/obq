var utils = require('./models/utils.js'),
  runner = require('./models/runner.js'),
  restReq = require('./models/restReq.js'),
  _ = require('lodash');

var URL = process.env.url,
  tagName = utils.getTagName();

runner.setup({url: URL});

var scriptName = 'freq_buyProduct_counterInc';

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
            "name==buy", "product"
          ]
        })
        .run()

    })

  })

  describe('buy 3 accessory', function () {

    it('should set counters buyProduct_accessory to 3', function () {

      var events = [
        {
          body: {
            name: "buy",
            product: {
              name: "accessory",
              productAmount: 1
            }
          },
          tags: [tagName]
        },
        {
          body: {
            name: "buy",
            product: {
              name: "accessory",
              productAmount: 2
            }
          },
          tags: [tagName]
        }
      ]

      runner.one('send 2 event')
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

            expect(_res.buyProduct_accessory).toBe(3);

          });

        })
        .run();

    })
  })

  describe('buy 3 coffeCapsule', function () {

    it('should set counters buyProduct_coffeCapsule to 3', function () {

      var events = [
        {
          body: {
            name: "buy",
            product: {
              name: "coffeCapsule",
              productAmount: 1
            }
          },
          tags: [tagName]
        },
        {
          body: {
            name: "buy",
            product: {
              name: "coffeCapsule",
              productAmount: 2
            }
          },
          tags: [tagName]
        }
      ]

      runner.one('send 2 event')
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

            expect(_res.buyProduct_coffeCapsule).toBe(3);

          });

        })
        .run();

    })
  })

  describe('buy 3 cleaningCapsule', function () {

    it('should set counters buyProduct_cleaningCapsule to 3', function () {

      var events = [
        {
          body: {
            name: "buy",
            product: {
              name: "cleaningCapsule",
              productAmount: 1
            }
          },
          tags: [tagName]
        },
        {
          body: {
            name: "buy",
            product: {
              name: "cleaningCapsule",
              productAmount: 2
            }
          },
          tags: [tagName]
        }
      ]

      runner.one('send 2 event')
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

            expect(_res.buyProduct_cleaningCapsule).toBe(3);

          });

        })
        .run();

    })
  })

  describe('buy 3 descalingCapsule', function () {

    it('should set counters buyProduct_descalingCapsule to 3', function () {

      var events = [
        {
          body: {
            name: "buy",
            product: {
              name: "descalingCapsule",
              productAmount: 1
            }
          },
          tags: [tagName]
        },
        {
          body: {
            name: "buy",
            product: {
              name: "descalingCapsule",
              productAmount: 2
            }
          },
          tags: [tagName]
        }
      ]

      runner.one('send 2 event')
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

            expect(_res.buyProduct_descalingCapsule).toBe(3);

          });

        })
        .run();

    })
  })

  describe('buy something with spaces in name', function () {

    it('should set counters buyProduct_sometestproduct to 5', function () {

      var events = [
        {
          body: {
            name: "buy",
            product: {
              name: "some test product",
              productAmount: 5
            }
          },
          tags: [tagName]
        }
      ]

      runner.one('send 2 event')
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

            expect(_res.buyProduct_sometestproduct).toBe(5);

          });

        })
        .run();

    })
  })

});
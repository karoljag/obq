var utils = require('./models/utils.js'),
  runner = require('./models/runner.js'),
  restReq = require('./models/restReq.js'),
  _ = require('lodash');

var URL = process.env.url,
  tagName = utils.getTagName();

runner.setup({url: URL});

var scriptName = 'other_subscribe';

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
          arguments: ["name==subscribeNL"]
        })
        .run()

    })

  })

  var scriptIncName = utils.getActionName(),
    testCounterName = 'the_subscriber';


  describe('achievements', function () {

    it('should add achievements ' + testCounterName, function () {
      runner.one()
        .achievement({name: testCounterName})
        .run();
    })

  })

  var userName1 = utils.getUsername();

  describe('[runner] logic', function () {

    it('send event and invoke script ' + scriptIncName + 'earn achievements: ' + testCounterName, function () {

      runner.one('invoke script')
        .createUser(userName1)
        .events([
          {
            body: {
              name:"subscribeNL"
            },
            tags: [tagName]
          }
        ])
        .finalTest(function () {

          restReq({
            url: URL + '/users/' + userName1 + '/achievements',
            method: 'get'
          }).then(function (res) {

            var keys = _.pluck(res.result, 'id');
            console.log(keys);
            expect(keys).toContain(testCounterName);

          });

        })
        .run();

    })
  })

});
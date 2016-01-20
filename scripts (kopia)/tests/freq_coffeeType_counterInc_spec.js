var utils = require('./models/utils.js'),
  runner = require('./models/runner.js'),
  restReq = require('./models/restReq.js'),
  _ = require('lodash');

var URL = process.env.url,
  tagName = utils.getTagName();

runner.setup({url: URL});

var scriptName = 'freq_coffeeType_counterInc';

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
            "name==brew", "capsuleId"
          ]
        })
        .run()

    })

  })

  describe('10x brew coffee', function () {

    var coffeeList = [
      {capsuleId: 'cof1', coffeeId: 'babaBudan'},
      {capsuleId: 'cof2', coffeeId: 'volcanesAntigua'},
      {capsuleId: 'cof3', coffeeId: 'jebenaYirga'},
      {capsuleId: 'cof4', coffeeId: 'estradaParaiso'},
      {capsuleId: 'cof5', coffeeId: 'buenaEnteta'},
      {capsuleId: 'cof6', coffeeId: 'altaMogiana'},
      {capsuleId: 'cof7', coffeeId: 'indianNiligri'},
      {capsuleId: 'cof8', coffeeId: 'sidamaRoyal'},
      {capsuleId: 'cof9', coffeeId: 'oroNarino'},
      {capsuleId: 'cof10', coffeeId: 'cafezinhoIpanema'}
    ];

    it('should set counters coffeeType_* to 1', function () {

      var events = utils.genCollection(function(i){
        return {
          body: { name: "brew", capsuleId: coffeeList[i].capsuleId },
          tags: [tagName]
        }
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
            
            coffeeList.forEach(function (cofObj) {
              expect(_res['coffeeType_'+cofObj.coffeeId]).toBe(1);
            })

            expect(_res.coffeeTypes).toBe(10);

          });

        })
        .run();

    })

  })

});
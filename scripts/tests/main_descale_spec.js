var utils = require('./models/utils.js'),
	runner = require('./models/runner.js'),
	restReq = require('./models/restReq.js'),
	_ = require('lodash');

var URL = process.env.url,
	tagName = utils.getTagName();

runner.setup({url: URL});

var scriptName = 'main_descale';

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
						"name==descale"
					]
				})
				.run()

		})

	})

	var scriptIncName = utils.getActionName(),
		scriptSetCounterName1 = utils.getActionName(),
		scriptSetCounterName2 = utils.getActionName(),
		scriptSetCounterName3 = utils.getActionName(),
		testCounterName = 'brewCoffee';

	describe('tmp action adder', function () {

		it('should add new script ' + scriptSetCounterName1 + ' that set counter ' + testCounterName + ' to 50 at ' + URL, function () {

			runner.one()
				.action({
					name: scriptSetCounterName1,
					code: '$self.counters().add("' + testCounterName + '", 320);',
					arguments: [scriptSetCounterName1]
				})
				.run()

		})

		it('should add new script ' + scriptSetCounterName2 + ' that set counter ' + testCounterName + ' to 100 at ' + URL, function () {

			runner.one()
				.action({
					name: scriptSetCounterName2,
					code: '$self.counters().add("' + testCounterName + '", 640);',
					arguments: [scriptSetCounterName2]
				})
				.run()

		})
		it('should add new script ' + scriptSetCounterName3 + ' that set counter ' + testCounterName + ' to 150 at ' + URL, function () {

			runner.one()
				.action({
					name: scriptSetCounterName3,
					code: '$self.counters().add("' + testCounterName + '", 960);',
					arguments: [scriptSetCounterName3]
				})
				.run()

		})

	})

	describe('achievements', function () {

		it('should add achievements descaleTamer__{level}', function () {

			runner.one()
				.achievement({name: 'descale_tamer_1'})
				.achievement({name: 'descale_tamer_2'})
				.achievement({name: 'descale_tamer_3'})
				.run();

		})

	})

	var userName1 = utils.getUsername();

	describe('[runner] logic', function () {

		var eventSetCounter1 = {body: {}, tags: [tagName]};
		eventSetCounter1.body[scriptSetCounterName1] = true;
		var eventSetCounter2 = {body: {}, tags: [tagName]};
		eventSetCounter2.body[scriptSetCounterName2] = true;
		var eventSetCounter3 = {body: {}, tags: [tagName]};
		eventSetCounter3.body[scriptSetCounterName3] = true;
		var eventDescale = {body: {name:"descale"}, tags: [tagName]};

		var events = [eventSetCounter1, eventDescale, eventSetCounter2, eventDescale, eventSetCounter3, eventDescale];
		it('send 3 events [(#1- ' + scriptSetCounterName1 + ' that add counter ' + testCounterName + ' and set it to 50), (#2- ' + scriptSetCounterName2 + ' that add counter ' + testCounterName + 'and set it to 100),(#3- ' + scriptSetCounterName2 + ' that add counter ' + testCounterName + 'and set it to 150), (#4- clean event )] and earn achievements cleanQBO_XXBrews', function () {

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
						console.log(_res.brewCoffee);
						expect(_res.brewCoffee).toBe(960);

						return restReq({
							url: URL + '/users/' + userName1 + '/achievements?limit=999',
							method: 'get'
						})

					}).then(function (res) {
						console.log(res.result);
						var keys = _.pluck(res.result, 'id');
						expect(keys).toContain('descale_tamer_1');
						expect(keys).toContain('descale_tamer_2');
						expect(keys).toContain('descale_tamer_3');
					});

				})
				.run();
		})
	})

});
var restReq = require('./restReq.js'),
	utils = require('./utils.js'),
	colors = require('colors'),
	fs = require('fs'),
	_ = require('lodash');

var runnerConfig = {};

function Logs() {
	this.logs = {};
	this.saveLogs = function (file,data) {
		fs.exists('models/logs', function (exists) {
			if (exists) {
				save(file,data);
			} else {
				fs.mkdir('models/logs', function (err) {
					if (err) throw err;
					console.log(colors.blue('Directory logs created.'));
					save(file,data);
				});
			}
		});
	};

	function save(file, data) {
		utils.log(utils.getTime(), colors.blue('Log for '+file+' updated'));
		fs.appendFile('models/logs/'+file+'s.json', ','+JSON.stringify(data));
	}
}

function Runner(name) {
	name = name || '';
	this.name = name;
	this.url = runnerConfig.url;
	this.tagName = runnerConfig.tag;
	this.actionList = [];
	this.eventList = [];
	this.achievementList = [];
	this.lbList = [];
	this.tagList = [];
	this.userList = [];
	this.log = new Logs();
	//this.log.loadLogs();
	utils.log(utils.getTime(), 'New runner'.cyan, name.yellow, '/', colors.yellow(this.url), '/', colors.yellow(this.tagName || 'no-tag'));
}

Runner.prototype.url = function (url) {
	this.url = url;
	return this;
};





Runner.prototype.tag = function (tagName) {
	this.tagName = tagName;

	this.tagList.push(tagName);
	return this;
};
Runner.prototype.createTag = function (tagName) {
	this.tagName = tagName;
	var self = this;

	utils.log(utils.getTime(), 'Create tag'.green, tagName.yellow);

	self._createTag(tagName);

	utils.pauseForEngine();

	return this;
};
Runner.prototype._createTag = function (tagName) {
	var self = this;
	return restReq({
		url: this.url + '/tags/' + tagName,
		method: 'put',
		body: {}
	}).then(function (res) {
		self.log.saveLogs('tag', tagName);
		res.response.statusCode = res.response.statusCode === 200 ? 201 : res.response.statusCode;
		expect(res.response.statusCode).toBe(201);
	});
};




Runner.prototype.user = function (userName) {
	this.userName = userName;
	this.userList.push(userName);
	return this;
};
Runner.prototype.createUser = function (userName, userData) {
	this.userName = userName;
	var self = this,
		defaults = {
			birthDate: new Date(new Date().setYear(new Date().getFullYear() - ((Math.random() * 20) + 10))).toISOString(),
			tags: [self.tagName]
		};

	userData = _.isObject(userData) ? userData : {};
	userData = _.defaults(userData, defaults);

	utils.log(utils.getTime(), 'Create user'.green, userName.yellow);
	utils.log(userData);

	restReq({
		url: this.url + '/users/' + userName,
		method: 'put',
		body: userData
	}).then(function (res) {

		expect(res.response.statusCode).toBe(201);

		self.log.saveLogs('user', userName);
		return restReq({
			url: self.url + '/users/' + userName,
			method: 'get'
		})

	});

	utils.pauseForEngine();

	return this;
};



Runner.prototype.events = function (events) {
	this.eventList = events;
	return this;
};
Runner.prototype._sendEvent = function (event) {
	var self = this;

	utils.log(utils.getTime(), 'Send event | user:'.green, colors.yellow(this.userName), '| runner:'.green, self.name.yellow, '\r\n', JSON.stringify(event.body));

	restReq({
		url: self.url + '/users/' + self.userName + '/events',
		method: 'post',
		body: event
	}).then(function (res) {
		if (res.response.statusCode >= 400) {
			throw new Error(res.result);
		}
		expect(res.response.statusCode).toBe(202);
	});

};


Runner.prototype.action = function (action, tagName) {
	if (tagName) {
		action.tagName = tagName;
	}
	this.actionList.push(action);
	return this;
};
Runner.prototype.actions = function (list) {
	for (var i = 0, l = list.length; i < l; i++) {
		var current = list[i];
		this.action(current);
	}
	return this;
};
Runner.prototype._updateAction = function (scriptData) {

	utils.log(utils.getTime(), 'Update action'.green, colors.yellow(scriptData.name));

	var self = this,
		currentTag = null;

	if (scriptData.tagName) {
		currentTag = scriptData.tagName;
		scriptData.tagName = null;
	} else {
		currentTag = self.tagName;
	}

	restReq({
		url: self.url + '/actions/' + scriptData.name,
		method: 'put',
		body: {
			name: scriptData.name,
			code: scriptData.code,
			arguments: scriptData.arguments,
			tags: [currentTag]
		}
	}).then(function (res) {
		self.log.saveLogs('action', scriptData.name);
		var code = res.response.statusCode === 201 ? 200 : res.response.statusCode;
		expect(code).toBe(200);
	});
};




Runner.prototype.achievement = function (achievement) {
	this.achievementList.push(achievement);
	return this;
};
Runner.prototype.achievements = function (list) {
	for (var i = 0, l = list.length; i < l; i++) {
		var current = list[i];
		this.achievement(current);
	}
	return this;
};
Runner.prototype._addAchievement = function (achieData) {
	utils.log(utils.getTime(), 'Add achievement'.green, colors.yellow(achieData.name));
	var self = this;

	achieData = achieData || {};
	restReq({
		url: self.url + '/achievements/' + achieData.name,
		method: 'put',
		body: achieData
	}).then(function () {
		restReq({
			url: URL + '/achievements/' + achieData.name,
			method: 'get'
		}).then(function (res) {
			self.log.saveLogs('achievement', achieData.name);
			expect(res.response.statusCode).toBe(200);
		})
	});
};



Runner.prototype.leaderboard = function (lb) {
	this.lbList.push(lb);
	return this;
};
Runner.prototype._addLb = function (lbData) {
	console.log(lbData);
	utils.log(utils.getTime(), 'Add leaderboard'.green, colors.yellow(lbData.id));
	var self = this;

	lbData = lbData || {};

	restReq({
		url: self.url + '/leaderboards/' + lbData.id,
		method: 'put',
		body: lbData
	}).then(function () {
		restReq({
			url: URL + '/leaderboards/' + lbData.id,
			method: 'get'
		}).then(function (res) {
			self.log.saveLogs('leaderboard', lbData.id);
			expect(res.response.statusCode).toBe(200);
		})
	});
};





Runner.prototype.finalTest = function (succFunc) {
	this.succFunc = succFunc;
	return this;
};




Runner.prototype.run = function () {
	var self = this;

	var pauseThreshold = 500,

	//actionLength = this.actionList.length,
		pernActionLength = this.actionList.length,

	//achieLength = this.achievementList.length,
		pernAchievementLength = this.achievementList.length,

	//eventLength = this.eventList.length,
		pernEventLength = this.eventList.length,

	//lbLength = this.lbList.length,
		pernLbLength = this.lbList.length;


	for (var iAL = 0, lAL = this.actionList.length; iAL < lAL; iAL++) {
		var currentAL = this.actionList[iAL];
		if (Object.prototype.toString.call(currentAL) !== '[object Array]') {
			currentAL = [currentAL];
		}
		this._updateAction.apply(this, currentAL);
	}
	self.actionList = [];

	if (pernActionLength) {
		var actionPause = pernActionLength * pauseThreshold;
		utils.pauseForEngine(actionPause);
	}


	for (var iLL = 0, lLL = this.lbList.length; iLL < lLL; iLL++) {
		var currentLL = this.lbList[iLL];
		if (Object.prototype.toString.call(currentLL) !== '[object Array]') {
			currentLL = [currentLL];
		}
		this._addLb.apply(this, currentLL);
	}
	self.lbList = [];

	if (pernLbLength) {
		var lbPause = pernLbLength * pauseThreshold;
		utils.pauseForEngine(lbPause);
	}


	for (var iAchL = 0, lAchL = this.achievementList.length; iAchL < lAchL; iAchL++) {
		var currentAchL = this.achievementList[iAchL];
		if (Object.prototype.toString.call(currentAchL) !== '[object Array]') {
			currentAchL = [currentAchL];
		}
		this._addAchievement.apply(this, currentAchL);
	}
	self.achievementList = [];

	if (pernAchievementLength) {
		var achievementPause = pernAchievementLength * pauseThreshold;
		utils.pauseForEngine(achievementPause);
	}


	for (var iEL = 0, lEL = this.eventList.length; iEL < lEL; iEL++) {
		var currentEL = this.eventList[iEL];
		if (Object.prototype.toString.call(currentEL) !== '[object Array]') {
			currentEL = [currentEL];
		}
		this._sendEvent.apply(this, currentEL);
	}

	if (pernEventLength) {
		var eventPause = pernEventLength * pauseThreshold;
		utils.pauseForEngine(eventPause);
	}

	if (self.succFunc) {
		utils.log(utils.getTime(), 'Final test for runner'.green, self.name.yellow);
		self.succFunc();
	}

	return this;
};



module.exports = {
	one: function (name) {
		return new Runner(name);
	},
	setup: function (conf) {
		for (var key in conf) {
			runnerConfig[key] = conf[key];
		}
	}
};
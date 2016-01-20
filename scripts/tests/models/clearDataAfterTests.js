'use strict';

// modules
var path = require('path');
var fs = require('fs');
var restReq = require('./restReq.js');
var http = require('http');

var colors = require('colors');
//var progressBar = require('progress');
var url = process.argv[2].split(':');
var host = url[1].replace('//', '');
var port = url[2];

if (url && host && port) {
	fs.readdir('logs', function (err, files) {
		if (err) {
			console.log(colors.red('There is a problem with listing logs'));
			console.log(colors.red(err));
		} else {
			var logs = {};
			for (var f = 0, fl = files.length; f < fl; f++) {
				(function (index) {
					var fileName = files[index];
					var key = fileName.replace('.json', '');
					fs.readFile('logs/' + fileName, 'utf8', function (err, content) {
						if (err) {
							console.log(colors.red('There is a problem with file logs/' + fileName));
							console.log(colors.red(err));
						} else {
							var array = JSON.parse('[' + content.substring(1) + ']');
							logs[key] = makeUnique(array);

							if (index === files.length - 1) {
								setTimeout(function () {
									clearLogs(logs);
								}, 1000)
							}
						}
					});
				}(f));
			}
		}
	});
} else {
	console.log(colors.red('Error with parsing url'));
}


function makeUnique(a) {
	var seen = {};
	var out = [];
	var len = a.length;
	var j = 0;
	for (var i = 0; i < len; i++) {
		var item = a[i];
		if (seen[item] !== 1) {
			seen[item] = 1;
			out[j++] = item;
		}
	}
	return out;
}


function clearLogs(logs) {
	for (var k in logs) {
		(function (resources) {
			var array = logs[resources];
			var resource = resources.substring(0, resources.length - 1);
			var errors = [];
			for (var a = 0, al = array.length; a < al; a++) {
				(function (index) {
					var element = array[index];
					http.request({
						host: host,
						port: port,
						path: '/' + resources + '/' + element,
						method: 'DELETE'
					}, function(res) {
						if (res.statusCode == 204) {
							console.log(colors.blue('Deleting ' + resource + ' ' + element + ': ') + colors.green('success!'));
						} else {
							console.log(colors.blue('Deleting ' + resource + ' ' + element + ': ') + colors.red('ERROR!'));
							errors.push(element)
						}

						if(index == array.length -1) {
							setTimeout(function() {
								updateLogs(resources, errors)
							}, 2000)
						}
					}).end();
				}(a));
			}
		}(k))
	}
}

function updateLogs(resources, errors) {
	var content = '';
	if(errors.length) {
		content = ','+errors.join(',');
	}
	fs.writeFileSync('logs/'+resources+'.json', content);
}
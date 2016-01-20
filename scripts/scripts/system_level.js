/*
 * description: The script calculates the level based on the number of badges.
 * arguments: ["$AchievementAdded"]
 */

// levels data
var levels = [
	{
		badgesReq: 20,
		info: {
			"id": "1",
			"name": {
				"en": "Qbo-Beginner",
				"de": "Kleiner Barista"
			},
			"desc": {
				"en": "You are a beginner, stay tuned to rise!",
				"de": "Du bist ein Anf�nger, bleibe am Ball und wachse!"
			}
		}
	},
	{
		badgesReq: 15,
		info: {
			"id": "2",
			"name": {
				"en": "Qbo Enthusiast",
				"de": "Name de: Lorem ipsum"
			},
			"desc": {
				"en": "Desc en: Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
				"de": "Desc de: Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed ratione voluptatem sequi nesciunt."
			}
		}
	},
	{
		badgesReq: 15,
		info: {
			"id": "3",
			"name": {
				"en": "Qbo Fan",
				"de": "Name de: Lorem ipsum"
			},
			"desc": {
				"en": "Desc en: Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
				"de": "Desc de: Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed ratione voluptatem sequi nesciunt."
			}
		}
	},
	{
		badgesReq: 15,
		info: {
			"id": "4",
			"name": {
				"en": "Qbo Geniesser",
				"de": "Name de: Lorem ipsum"
			},
			"desc": {
				"en": "Desc en: Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
				"de": "Desc de: Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed ratione voluptatem sequi nesciunt."
			}
		}
	},
	{
		badgesReq: 15,
		info: {
			"id": "5",
			"name": {
				"en": "Qbo Experte",
				"de": "Name de: Lorem ipsum"
			},
			"desc": {
				"en": "Desc en: Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
				"de": "Desc de: Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed ratione voluptatem sequi nesciunt."
			}
		}
	},
	{
		badgesReq: 15,
		info: {
			"id": "6",
			"name": {
				"en": "Qbo Barista",
				"de": "Name de: Lorem ipsum"
			},
			"desc": {
				"en": "Desc en: Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
				"de": "Desc de: Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed ratione voluptatem sequi nesciunt."
			}
		}
	},
	{
		badgesReq: 15,
		info: {
			"id": "7",
			"name": {
				"en": "Qbo Barista",
				"de": "Name de: Lorem ipsum"
			},
			"desc": {
				"en": "Desc en: Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
				"de": "Desc de: Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed ratione voluptatem sequi nesciunt."
			}
		}
	},
	{
		badgesReq: 10,
		info: {
			"id": "8",
			"name": {
				"en": "Qbo Barista",
				"de": "Name de: Lorem ipsum"
			},
			"desc": {
				"en": "Desc en: Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
				"de": "Desc de: Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed ratione voluptatem sequi nesciunt."
			}
		}
	},
	{
		badgesReq: 5,
		info: {
			"id": "9",
			"name": {
				"en": "Qbo Barista",
				"de": "Name de: Lorem ipsum"
			},
			"desc": {
				"en": "Desc en: Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
				"de": "Desc de: Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed ratione voluptatem sequi nesciunt."
			}
		}
	},
	{
		badgesReq: 15,
		info: {
			"id": "10",
			"name": {
				"en": "Qbo Barista",
				"de": "Name de: Lorem ipsum"
			},
			"desc": {
				"en": "Desc en: Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
				"de": "Desc de: Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed ratione voluptatem sequi nesciunt."
			}
		}
	},
	{
		badgesReq: 20,
		info: {
			"id": "11",
			"name": {
				"en": "Qbo Barista",
				"de": "Name de: Lorem ipsum"
			},
			"desc": {
				"en": "Desc en: Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
				"de": "Desc de: Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed ratione voluptatem sequi nesciunt."
			}
		}
	}
];

// basic variables
var levelHistory = $self.properties().get('levelHistory'),
	oldLevel = $self.counters().get('level'),
	badgeCount = $self.achievements().count();

// fix level value if not defiend
oldLevel = oldLevel ? oldLevel.value : 1;

// fix level history
if (!levelHistory) {
	levelHistory = {};
}

// get level based on actual user's achievements count
function getLevel(points, levelSteps) {
	var badgesReq = 0;
	var level = 1;
	for (var i = 0, l = levelSteps.length; i < l; i++) {
		badgesReq += levelSteps[i].badgesReq;
		if (points >= badgesReq) {
			level++
		} else {
			return {
				level: level,
				toNextLevel: badgesReq - points
			}
		}
	}
	return {
		level: level,
		toNextLevel: 0
	}
}

// check actual level
var newLevel = getLevel(badgeCount, levels);

// set counter for level
$self.counters().set('level', newLevel.level);
$self.counters().set('toNextLevel', newLevel.toNextLevel);

// check if level changes
if (oldLevel < newLevel.level) {
	for (var i = 2; i <= newLevel.level; i++) {
		var currentLevel = i.toString();
		// check if there is hostory for new level
		if (!levelHistory[currentLevel]) {
			var date = new Date().toISOString();

			// set item to history
			levelHistory[currentLevel] = date;
			var toNextLevel = $self.counters().get('toNextLevel').value;
			// push isaa notification
			$self.notifications().push({
				type: 'notificationLevelUp',
				memberLevel: i,
				toNextLevel: toNextLevel,
				createdAt: date,
				isRead: false
			});

			// create variables for qbo notification
			var userId = $self.id();
			// get additional information form static data from script defined above if level is under 12 or generate info based on level and simple template
			var info = newLevel.level < 12 ? levels[newLevel.level].info : {
				"id": newLevel.level,

				"name": {
					"en": "Name en for level " + newLevel.level + " build dynamically.",
					"de": "Name de for level " + newLevel.level + " build dynamically."
				},
				"desc": {
					"en": "Desc en for level " + newLevel.level + " build dynamically.",
					"de": "Desc de for level " + newLevel.level + " build dynamically."
				}
			};
			// push qbo notification with $integration


			$integration.push('notifyQ', {
				"body": {
					"userId": userId,
					"type": "levelchanged",
					"memberLevel": i,
					"toNextLevel": toNextLevel,
					"timestamp": new Date().getTime(),
					"additionalInformation": info
				}
			}, ['notifyQ']);

			var voucherId = 'gift1level'+String(i-1);
			$self.vouchers().earn(voucherId);

		}
	}
	// update level history
	$self.properties().put('levelHistory', levelHistory);
}





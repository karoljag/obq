/*
 * description: The script adds an achievement; depends on the amount of used coffee capsules.
 * arguments: ["name==descale"]
 */

var brewsCounter = $self.counters().get('brewCoffee'),
	brewsValue = brewsCounter.value;
var achievementName = 'descale_tamer_';


var badgeLevels = [
	{value: 320, levelName: '1'},
	{value: 640, levelName: '2'},
	{value: 960, levelName: '3'}
];


for (var i = 0, l = badgeLevels.length; i < l; i++) {

	if (brewsValue >= badgeLevels[i].value && ($achievements.get(achievementName + badgeLevels[i].levelName) && !$self.achievements().contains(achievementName + badgeLevels[i].levelName))) {
		$self.achievements().earn(achievementName + badgeLevels[i].levelName, {earnedAt: new Date().toISOString()});
	}
}

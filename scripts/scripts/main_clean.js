/*
 * description: The script adds an achievement; depends on the amount of brewed coffees.
 * arguments: ["name==clean"]
 */

var brewsCounter = $self.counters().get('brewCoffee'),
	brewsValue = brewsCounter.value;
var achievementName =  'Cleaning_Champion_';


var badgeLevels = [
	{value: 50, levelName: '1'},
	{value: 100, levelName: '2'},
	{value: 150, levelName: '3'}
];


for (var i = 0, l = badgeLevels.length; i < l; i++) {

	if (brewsValue >= badgeLevels[i].value && ($achievements.get(achievementName + badgeLevels[i].levelName) && !$self.achievements().contains(achievementName + badgeLevels[i].levelName))) {
		$self.achievements().earn(achievementName + badgeLevels[i].levelName, {earnedAt: new Date().toISOString()});
	}
}

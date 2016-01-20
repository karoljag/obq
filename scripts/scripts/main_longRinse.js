/*
 * description: The script adds an achievement; depends on the amount of long rinses done.
 * arguments: ["$CounterIncremented.counterName==longRinse"]
 */
var achievementName = "rinse_master";

var badgeLevels = [
	{value: 5, levelName: '1'},
	{value: 10, levelName: '2'},
	{value: 15, levelName: '3'}

];

var userId = $self.id(),
	tags = ['badgesWithProgress'];

$system.sendUserEvent(userId, tags, {
	handleBadgesWithProgress: true,
	counterValue: $event.counterValue,
	badgeName: achievementName,
	badgeLevels: badgeLevels
});


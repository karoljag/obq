/*
 * description: The script adds an achievement; depends on the amount of shared recipes.
 * arguments: ["$CounterIncremented.counterName==shareRecipe"]
 */

var achievementName = 'reciper_sharer';
var badgeLevels = [
  {value: 1, levelName: '1'},
  {value: 5, levelName: '5'},
  {value: 10, levelName: '10'},
  {value: 15, levelName: '15'}
];

var userId = $self.id(),
  tags = ['badgesWithProgress'];

$system.sendUserEvent(userId, tags, {
  handleBadgesWithProgress: true,
  counterValue: $event.counterValue,
  badgeName: achievementName,
  badgeLevels: badgeLevels
});


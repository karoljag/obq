/*
 * description: The script adds an achievement; depends on the amount of created recipes.
 * arguments: ["$CounterIncremented.counterName==createRecipe"]
 */
var achievementName = 'taste';
var badgeLevels = [
  {value: 1, levelName: 'rookie'},
  {value: 5, levelName: 'designer_1'},
  {value: 10, levelName: 'designer_2'},
  {value: 15, levelName: 'designer_3'}
];

var userId = $self.id(),
  tags = ['badgesWithProgress'];

$system.sendUserEvent(userId, tags, {
  handleBadgesWithProgress: true,
  counterValue: $event.counterValue,
  badgeName: achievementName,
  badgeLevels: badgeLevels
});

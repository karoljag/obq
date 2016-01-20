/*
 * description: The script adds an achievement; depends on the amount of favorite recipes.
 * arguments: ["$CounterIncremented.counterName==favRecipe"]
 */

var achievementName = 'recipe';

var badgeLevels = [
  {value: 1, levelName: 'author'}
];

var userId = $self.id(),
  tags = ['badgesWithProgress'];

$system.sendUserEvent(userId, tags, {
  handleBadgesWithProgress: true,
  counterValue: $event.counterValue,
  badgeName: achievementName,
  badgeLevels: badgeLevels
});


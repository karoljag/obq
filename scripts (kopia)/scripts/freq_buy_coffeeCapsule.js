/*
 * description: The script handles the logic for a specific type of coffee.
 * arguments: ["$CounterIncremented.counterName==buyProduct_coffeeCapsule"]
 */

var achievementName = 'cube_collector';

var badgeLevels = [
  {value: 8, levelName: '1'},
  {value: 27, levelName: '2'}
];

var userId = $self.id(),
  tags = ['badgesWithProgress'];

$system.sendUserEvent(userId, tags, {
  handleBadgesWithProgress: true,
  counterValue: $event.counterValue,
  badgeName: achievementName,
  badgeLevels: badgeLevels
});


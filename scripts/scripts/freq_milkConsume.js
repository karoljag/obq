/*
 * description: The script adds an achievement; depends on the amount of milk consumed.
 * arguments: ["$CounterIncremented.counterName==milkConsume"]
 */

var achievementName = 'milk_fan';

var badgeLevels = [
  {value: 3000, levelName: '1'},
  {value: 10000, levelName: '2'},
  {value: 30000, levelName: '3'},
  {value: 100000, levelName: '4'}
];

var userId = $self.id(),
  tags = ['badgesWithProgress'];

$system.sendUserEvent(userId, tags, {
  handleBadgesWithProgress: true,
  counterValue: $event.counterValue,
  badgeName: achievementName,
  badgeLevels: badgeLevels
});


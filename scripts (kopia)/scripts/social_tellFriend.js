/*
 * description: The script adds an achievement; depends on the amount of friends informed.
 * arguments: ["$CounterIncremented.counterName==tellFriend"]
 */
var achievementName = 'qbo_ambasador';
var badgeLevels = [
  {value: 5, levelName: '1'},
  {value: 10, levelName: '2'},
  {value: 25, levelName: '3'}
];

var userId = $self.id(),
  tags = ['badgesWithProgress'];

$system.sendUserEvent(userId, tags, {
  handleBadgesWithProgress: true,
  counterValue: $event.counterValue,
  badgeName: achievementName,
  badgeLevels: badgeLevels
});


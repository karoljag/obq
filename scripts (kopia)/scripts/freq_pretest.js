/*
 * description: The script adds an achievement; depends on the amount of pretest coffees.
 * arguments: ["$CounterIncremented.counterName==brewPretest"]
 */

var achievementName = 'VIP_flavor';

var badgeLevels = [
  {value: 1, levelName: '1'},
  {value: 5, levelName: '2'},
  {value: 10, levelName: '3'},
  {value: 15, levelName: '4'}
];

var userId = $self.id(),
  tags = ['badgesWithProgress'];

$system.sendUserEvent(userId, tags, {
  handleBadgesWithProgress: true,
  counterValue: $event.counterValue,
  badgeName: achievementName,
  badgeLevels: badgeLevels
});


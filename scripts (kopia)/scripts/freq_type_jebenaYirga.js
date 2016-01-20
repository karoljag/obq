/*
 * description: The script handles the logic for jebenaYirga type of coffee.
 * arguments: ["$CounterIncremented.counterName==coffeeType_jebenaYirga]
 */

var achievementName = 'jebena_yirga';
var badgeLevels = [
  {value: 1, levelName: 'tester'},
  {value: 10, levelName: 'fan_1'},
  {value: 30, levelName: 'fan_2'},
  {value: 70, levelName: 'fan_3'}
];

var userId = $self.id(),
  tags = ['badgesWithProgress'];

$system.sendUserEvent(userId, tags, {
  handleBadgesWithProgress: true,
  counterValue: $event.counterValue,
  badgeName: achievementName,
  badgeLevels: badgeLevels
});


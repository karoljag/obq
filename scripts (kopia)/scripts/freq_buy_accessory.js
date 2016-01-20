/*
 * description: The script handles the logic for a specific type of coffee.	
 * arguments: ["$CounterIncremented.counterName==buyProduct_accessory"]
 */

var achievementName = 'stuff_achiever';

var badgeLevels = [
  {value: 1, levelName: '1'},
  {value: 3, levelName: '2'},
  {value: 7, levelName: '3'}
];

var userId = $self.id(),
  tags = ['badgesWithProgress'];

$system.sendUserEvent(userId, tags, {
  handleBadgesWithProgress: true,
  counterValue: $event.counterValue,
  badgeName: achievementName,
  badgeLevels: badgeLevels
});


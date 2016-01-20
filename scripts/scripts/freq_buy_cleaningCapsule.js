/*
 * description: The script handles the logic for a specific type of coffee.
 * arguments: ["$CounterIncremented.counterName==buyProduct_cleaningCapsule"]
 */

var achievementName = "clean_agent";

var badgeLevels = [
  {value: 4, levelName: '1'},
  {value: 8, levelName: '2'},
  {value: 16, levelName: '3'}
];

var userId = $self.id(),
  tags = ['badgesWithProgress'];

$system.sendUserEvent(userId, tags, {
  handleBadgesWithProgress: true,
  counterValue: $event.counterValue,
  badgeName: achievementName,
  badgeLevels: badgeLevels
});


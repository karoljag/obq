/*
 * description: The script adds an achievement; depends on the amount of brewed coffees.
 * arguments: ["$CounterIncremented.counterName==brewCoffee"]
 */

var badgeLevels = [
  {value: 10, levelName: '10'},
  {value: 20, levelName: '20'},
  {value: 30, levelName: '30'},
  {value: 40, levelName: '40'},
  {value: 50, levelName: '50'},
  {value: 60, levelName: '60'},
  {value: 70, levelName: '70'},
  {value: 80, levelName: '80'},
  {value: 90, levelName: '90'},
  {value: 100, levelName: '100'},
  {value: 110, levelName: '110'},
  {value: 120, levelName: '120'},
  {value: 130, levelName: '130'},
  {value: 140, levelName: '140'},
  {value: 150, levelName: '150'},
  {value: 200, levelName: '200'},
  {value: 250, levelName: '250'},
  {value: 300, levelName: '300'},
  {value: 400, levelName: '400'}

];

var userId = $self.id(),
  tags = ['badgesWithProgress'];

$system.sendUserEvent(userId, tags, {
  handleBadgesWithProgress: true,
  counterValue: $event.counterValue,
  badgeName: 'hot',
  badgeLevels: badgeLevels
});


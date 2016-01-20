/*
 * description: The script adds an achievement based on the amount of coffee types.
 * arguments: ["$CounterIncremented.counterName==coffeeTypes", "$CounterIncremented.counterValue>=10"]
 */

var achievementName = 'qbo_taste_expert';

// check if achievement exist
if (!$self.achievements().contains(achievementName)) {

  // add achievement
  $self.achievements().earn(achievementName, {earnedAt: new Date().toISOString()});

}
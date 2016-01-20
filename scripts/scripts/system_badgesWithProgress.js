/*
 * description: The script handles earning of badges with progress.
 * arguments: ["handleBadgesWithProgress", "badgeName", "badgeLevels"]
 */

var earnAchievement = function (levelName) {
  var achievementName = badgeKey+'_'+levelName;

  // check if achievement exist and has not been earned
  if (!$self.achievements().contains(achievementName)) {

    // add achievement
    $self.achievements().earn(achievementName, {earnedAt: new Date().toISOString()});

  }

}

var runLogic = function (counterValue) {
  for (var i = 0, l = $event.badgeLevels.length; i < l; i++) {
    var current = $event.badgeLevels[i];

      if (counterValue >= current.value) {
        earnAchievement(current.levelName);
      }
  }
};

/* **************************************************** */
/* **************************************************** */

var badgeKey = $event.badgeName,
  counterValue = $event.counterValue;

// manage levels achieved by user
runLogic(counterValue);
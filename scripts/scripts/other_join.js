/*
 * description: The script adds the welcome achievement, after the user has joined the program.	
 * arguments: ["$Created"]
 */

var achievementName = 'welcome';
console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
console.log($achievements.get(achievementName));
console.log($self.achievements().contains(achievementName));

if ($achievements.get(achievementName) && !$self.achievements().contains(achievementName)) {
	$self.achievements().earn(achievementName, {earnedAt: new Date().toISOString()});
}


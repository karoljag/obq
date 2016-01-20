/*
 * description: The script adds the dilligentStudent achievement, after the user has gone through a tutorial.	
 * arguments: ["name==tutorialPassed"]
 */

var achievementName = 'diligent_student';
if ($achievements.get(achievementName) && !$self.achievements().contains(achievementName)) {
	$self.achievements().earn(achievementName, {earnedAt: new Date().toISOString()});
}
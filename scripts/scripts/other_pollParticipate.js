/*
 * description: The script adds the pollParticipate achievement, after the user has participated in a poll.	
 * arguments: ["name==pollParticipate"]
 */

var achievementName = 'opinion_share';
if ($achievements.get(achievementName) && !$self.achievements().contains(achievementName)) {
	$self.achievements().earn(achievementName, {earnedAt: new Date().toISOString()});
}

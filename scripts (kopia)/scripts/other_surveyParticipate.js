/*
 * description: The script adds the surveyParticipate achievement, after the user has participated in a survey.	
 * arguments: ["name==surveyParticipate"]
 */

var achievementName = 'opinion_count';
if ($achievements.get(achievementName) && !$self.achievements().contains(achievementName)) {
	$self.achievements().earn(achievementName, {earnedAt: new Date().toISOString()});
}

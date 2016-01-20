/*
 * description: The script adds the subscriber achievement, after the user has subscribed to a product newsletter.	
 * arguments: ["name==subscribeNL"]
 */

var achievementName = 'the_subscriber';
if ($achievements.get(achievementName) && !$self.achievements().contains(achievementName)) {
	$self.achievements().earn(achievementName, {earnedAt: new Date().toISOString()});
}

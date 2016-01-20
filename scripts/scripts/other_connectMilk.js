/*
 * description: The script adds the milkModuleOwner achievement, after the user has connected the milk module.	
 * arguments: ["name==milkElementAttached"]
 */

var achievementName = 'milk_module_owner';
if ($achievements.get(achievementName) && !$self.achievements().contains(achievementName)) {
	$self.achievements().earn(achievementName, {earnedAt: new Date().toISOString()});
}
/*
 * description: The script adds the machineOwner achievement, after the user has connected the machine and became the machine admin.
 * arguments: ["name==setupAsAdmin"]
 */

var achievementName = 'machine_owner';
if ($achievements.get(achievementName) && !$self.achievements().contains(achievementName)) {
	$self.achievements().earn(achievementName, {earnedAt: new Date().toISOString()});
}
//
// increment stats about achievement earned
//
// arguments: ["$AchievementAdded"]
//

// check if achievement exists
var achievement = $achievements.get($event.achievement.id);
if(achievement) {
	// get achievement properties
	var group = achievement.category ? achievement.category : 'unknown-category';
	var name = achievement.name ? achievement.name : 'unknown-name';

	// store basic achievement stat
	$stats.increment("kpi.achievements."+group+"."+name, 1, 1);

	// check if user exists
	var member = $self.id();
	if(member) {
		// store achievement stat in user object
		$stats.increment("kpi.user."+member+".achievements." + group + "." + name, 1, 1);
	}
}
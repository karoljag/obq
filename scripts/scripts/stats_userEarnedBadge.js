//
// increment stats about members earning badge
//
// arguments: ['$AchievementAdded']
//
var userId = $self.id();
if (userId) {
	$stats.increment("kpi.user."+userId+".achievements", 1, 1);
}

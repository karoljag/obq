/*
 * description: The script adds a notification when the user has earned a badge.
 * arguments: ["$AchievementAdded"]
 */
var currentAchievement = $event.achievement,
	levelCounter = $self.counters().get('level'),
	levelValue = levelCounter ? levelCounter.value : 1;

// push notification
$self.notifications().push({
	type: 'notificationEarned',
	badge: currentAchievement,
	memberLevel: levelValue,
	createdAt: new Date().toISOString(),
	isRead: false
});

var userId = $self.id();
$integration.push('notifyQ', {
	"body": {
		"userId": userId,
		"type": "badgeEarned",
		"total": $self.achievements().count(),
		"memberLevel": levelValue,
		"timestamp": new Date().getTime(),
		"additionalInformation": currentAchievement
	}
}, ['notifyQ']);

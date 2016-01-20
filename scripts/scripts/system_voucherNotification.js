/*
 * description: The script adds a notification when the user has earned a voucher.
 * arguments: ["$VoucherAssigned"]
 */
var levelCounter = $self.counters().get('level'),
	levelValue = levelCounter ? levelCounter.value : 0;


// push isaa notification
$self.notifications().push({
	type: 'voucherEarned',
	memberLevel: levelValue,
	createdAt: new Date().toISOString(),
	isRead: false
});


// push qbo notification with $integration
$integration.push('notifyQ', {
	"body": {
		"userId": $self.id(),
		"type": "voucherEarned",
		"memberLevel": levelValue,
		"timestamp": new Date().getTime(),
		"additionalInformation": $event.properties
	}
}, ['notifyQ']);



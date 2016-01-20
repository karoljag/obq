/*
 * description: The script adds a notification when the user has redeemed a voucher.
 * arguments: ["$CodeRedeemed"]
 */
var levelCounter = $self.counters().get('level'),
	levelValue = levelCounter ? levelCounter.value : 1;

// push qbo notification with $integration
$integration.push('notifyQ', {
	"body": {
		"userId": $self.id(),
		"type": "voucherRedeemed",
		"memberLevel": levelValue,
		"timestamp":  new Date().getTime(),
		"additionalInformation": $event
	}
}, ['notifyQ']);


// push isaa notification
$self.notifications().push({
	type: 'voucherRedeemed',
	memberLevel: levelValue,
	createdAt: new Date().toISOString(),
	isRead: false
});

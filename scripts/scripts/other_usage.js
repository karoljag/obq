/*
 * description: The script adds an achievement; depends on the frequency with which the user logs in.	
 * arguments: ["$CounterIncremented.counterName==usage"]
 */

/*
	sprawdzenie przedzialow dla countera i przyznanie badge
*/

function monthsAgoDay(months) {
	var today = new Date(),
        monthAgo = new Date();
		monthAgo.setMonth(monthAgo.getMonth()-months);

	if(monthAgo.getMonth() !== today.getMonth()-months){
		monthAgo.setDate(0); 
	}

    return monthAgo;
}

var todayTimestamp = new Date().getTime(),
	monthAgoDay = monthsAgoDay(1),
	ThreeMonthsAgoDay = monthsAgoDay(3),
	diffMonth =  Math.round((todayTimestamp - monthAgoDay.getTime())  / 86400000),
	diff3Months = Math.round((todayTimestamp - ThreeMonthsAgoDay.getTime())  / 86400000);

console.log('--------------------------------------');
console.log(diff3Months);

var usageData = {
	badgeLevels: [
		{value: 7, badgeName: 'regularUser1'},
		{value: 14, badgeName: 'regularUser2'},
		{value: diffMonth, badgeName: 'regularUser3'},
		{value: diff3Months, badgeName: 'regularUser4'}
	],
	usageCounter: $event.counterValue
}

switch(usageData.usageCounter) {
	case usageData.badgeLevels[0].value:
		var achievementName = usageData.badgeLevels[0].badgeName;
		break;
	case usageData.badgeLevels[1].value:
		var achievementName = usageData.badgeLevels[1].badgeName;
		break;
	case usageData.badgeLevels[2].value:
		var achievementName = usageData.badgeLevels[2].badgeName;
		break;
	case usageData.badgeLevels[3].value:
		var achievementName = usageData.badgeLevels[3].badgeName;
		break;
}
if ($achievements.get(achievementName) && !$self.achievements().contains(achievementName)) {
	$self.achievements().earn(achievementName, {earnedAt: new Date().toISOString()});
}
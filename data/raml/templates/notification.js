var created = faker.date.past();

var notificationEarned = {
	id: tmplUtils.stringId(),
    type: "notificationEarned",	
	memberLevel: faker.random.number(50),
    createdAt: created,
    badge: tmplUtils.getTemplate('user_achievement.js'),
    isRead: faker.random.array_element([true, false])
};

var levelchanged = {
	id: tmplUtils.stringId(),	
	type: "levelchanged",
	memberLevel: faker.random.number(50),
	toNextLevel: faker.random.number(3,10),
    createdAt: created,
    isRead: faker.random.array_element([true, false])    
};

var voucherEarned = {
	id: tmplUtils.stringId(),	
   	type: "voucherEarned",
	memberLevel: faker.random.number(50),
    createdAt: created,
    isRead: faker.random.array_element([true, false])
};

var voucherRedeemed = {
	id: tmplUtils.stringId(),	
	type: "voucherRedeemed",
	memberLevel: faker.random.number(50),
    createdAt: created,
    isRead: faker.random.array_element([true, false])
};

module.exports = faker.random.array_element([ notificationEarned, voucherEarned, levelchanged, voucherRedeemed ])
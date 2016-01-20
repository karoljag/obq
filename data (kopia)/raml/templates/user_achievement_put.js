var earned = faker.date.past();

var description = {
	en: faker.lorem.sentence().substr(0, 20),
	de: faker.lorem.sentence().substr(0, 20)
};

var nm = {
	en: faker.lorem.sentence().substr(1),
	de: faker.lorem.sentence().substr(1)
};

var ic = {
	en: faker.image.imageUrl(),
	de: faker.image.imageUrl()
};

module.exports = {
    package: faker.random.number(),
    desc: description,
    name: nm,
    icon: ic,
    earnedAt: earned,
	category: faker.random.array_element(["other", "social", "trial", "maintenance", "frequency" ]),
	counter: faker.random.number(100),
	type: faker.random.array_element(["onetime", "progressive"]),
    visibility: faker.random.array_element(["standard", "surprise"]),
    level: faker.random.number(30)
};
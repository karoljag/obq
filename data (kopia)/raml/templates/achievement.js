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
    id: tmplUtils.stringId(),
    package: faker.random.number(),
    desc: description,
    name: nm,
    icon: ic,
	category: faker.random.array_element(["other", "social", "trial", "maintenance", "frequency" ]),
	counter: faker.random.number(100),
	type: faker.random.array_element(["onetime", "progressive"]),
    visibility: faker.random.array_element(["standard", "surprise"]),
    group: faker.random.array_element([ "brew", "buy", "usage", "createRecipe", "addFavoriteRecipe", "shareRecipe", "tellFriend" ]),
    level: faker.random.number(30)
};
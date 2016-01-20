var created = faker.date.past();

var pic = {
	en: faker.image.cats(),
	de: faker.image.cats()
};

module.exports = {
  name: faker.lorem.sentence().substr(0, 50),
  description: faker.lorem.paragraph().substr(0, 300),
  active: faker.random.array_element([ "true", "false" ]),  
  picture: pic,
  startDate: created,
  endDate: faker.date.future()
};
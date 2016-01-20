var created = faker.date.past(),
  generated = faker.random.number(9999);

var pic = {
	en: faker.image.cats(),
	de: faker.image.cats()
};

module.exports = {
  id: tmplUtils.stringId(),
  name: faker.lorem.sentence().substr(0, 50),
  description: faker.lorem.paragraph().substr(0, 300),
  active: faker.random.array_element([ "true", "false" ]),
  picture: pic,
  startDate: faker.date.past(),
  endDate: faker.date.future()
};
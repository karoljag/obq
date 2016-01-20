var created = faker.date.past();

var pic = {
	en: faker.image.cats(),
	de: faker.image.cats()
};

module.exports = {
  id: tmplUtils.stringId(),
  status: faker.random.array_element(['active', 'redeemed', 'disabled', 'assigned']),
  voucherId: tmplUtils.stringId(),
  name: faker.lorem.sentence().substr(0, 50),
  description: faker.lorem.paragraph().substr(0, 300),
  picture: pic,
  startDate: created,
  endDate: faker.date.future()
};
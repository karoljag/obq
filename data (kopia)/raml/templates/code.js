var case_one = {
  id: tmplUtils.stringId(),
  voucherId: tmplUtils.stringId(),  
  status: faker.random.array_element(['active', 'disabled'])
};

var case_two = {
  id: tmplUtils.stringId(),
  ownerId: tmplUtils.stringId(),
  voucherId: tmplUtils.stringId(),  
  status: faker.random.array_element(['redeemed', 'assigned'])
};

module.exports = faker.random.array_element([case_one, case_two])
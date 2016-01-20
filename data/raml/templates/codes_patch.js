var case_one = {
  id: tmplUtils.stringId(),
  status: "disabled"
};

var case_two = {
	id: tmplUtils.stringId(),
	status: faker.random.array_element(['redeemed', 'assigned']),
	ownerId: tmplUtils.stringId()
};

var multiple_cases1 = tmplUtils.multiCollection(5, 10)(function (i) {
    return case_one;
});

var multiple_cases2 = tmplUtils.multiCollection(5, 10)(function (i) {
    return case_two;
});

module.exports = faker.random.array_element([multiple_cases1, multiple_cases2])
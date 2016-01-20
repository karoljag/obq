module.exports = {
    uid: tmplUtils.stringId(),
    countryCode: "DE",
    email: faker.internet.email(),
    confirmationState: faker.random.array_element([ "PENDING", "CONFIRMED", "CHANGED" ]),
    nickName: faker.internet.userName(),
    productNews: faker.random.array_element(["true", "false"]),
    tags: faker.lorem.words(1, 5),
    groups: faker.lorem.words(0, 1)
};
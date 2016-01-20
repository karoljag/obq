var frisby = require('frisby');
var jasmine = require('jasmine');
var url = process.env.url;
var randomString = require('random-string');

var sR1 = "reciper_sharer_1";
var sR5 = "reciper_sharer_5";
var sR10 = "reciper_sharer_10";
var sR15 = "reciper_sharer_15";


function wait(t1) {
    // t1- miliseconds
    var waiter;
    runs(function() {
        waiter = false;
        setTimeout(function() {
            waiter = true;
        }, t1);
    });

    waitsFor(function() {
        return waiter;
    }, 'timeout test', t1 + 500);

}

describe("QBO tests", function() {

    var user0 = 'user_0_' + randomString({
        length: 10
    });

    var user1 = 'user_1_' + randomString({
        length: 10
    });
    var user2 = 'user_2_' + randomString({
        length: 10
    });
    var user3 = 'user_3_' + randomString({
        length: 10
    });
    var user4 = 'user_4_' + randomString({
        length: 10
    });
    var user5 = 'user_5_' + randomString({
        length: 10
    });
    var user6 = 'user_6_' + randomString({
        length: 10
    });
    var user7 = 'user_7_' + randomString({
        length: 10
    });
    var user8 = 'user_8_' + randomString({
        length: 10
    });
    var user9 = 'user_9_' + randomString({
        length: 10
    });
    var user10 = 'user_11_' + randomString({
        length: 10
    });
    var user11 = 'user_11_' + randomString({
        length: 10
    });
    var user12 = 'user_12_' + randomString({
        length: 10
    });
    var user13 = 'user_13_' + randomString({
        length: 10
    });
    var user14 = 'user_14_' + randomString({
        length: 10
    });
    var user15 = 'user_15_' + randomString({
        length: 10
    });




    it("share recipe tests", function() {

        var UserArr = [user0, user1, user2, user3, user4, user5,
            user6, user7, user8, user9, user10,
            user11, user12, user13, user14, user15
        ]


        for (i = 0; i < UserArr.length; i++) {

            //Create 1 user
            frisby.create('PUT  user')
                .put(url + '/users/' + UserArr[i], {
                    "firstName": UserArr[i],
                    "confirmationState": "CONFIRMED",
                    "email": "first.lee@bornholdtlee.de",
                    "tags": ["qbo", "badgesWithProgress"]
                }, {
                    json: true
                })
                .expectStatus(201)
                .toss();
        }



        for (i = 0; i < UserArr.length; i++) {

            frisby.create('POST event for getting share recipe  ')
                .post(url + '/users/' + UserArr[i] + '/events', {
                    "body": {
                        "tm": 3641671232,
                        "name": "brew",
                        "machineId": "uuid",
                        "version": "v1_2",
                        "capsuleId": "260",
                        "recipe": {
                            "uid": "default-1",
                            "creatorId": user0,
                            "userId": UserArr[i],
                            "userName": "Monica",
                            "name": "My coffee nr ",
                            "coffeeAmount": 10,
                            "foamAmount": 10,
                            "milkAmount": 20,
                            "cupSize": 200,
                            "creationTimestamp": 1410767140,
                            "defaultRecipe": 0,
                            "usesHotMilk": 1,
                            "sequence": {
                                "index_0": 3,
                                "index_1": 4,
                                "index_2": 5,
                                "index_3": 1,
                                "index_4": 0
                            }
                        },
                        "brewed": {
                            "cancelled": 1,
                            "coffeeAmount": 21,
                            "foamAmount": 100,
                            "milkAmount": 150
                        },
                        "favouriteCapsuleId": 866
                    }

                }, {
                    json: true
                })
                .expectStatus(202)
                .toss();
        }



        wait(4000)

        frisby.create('Getting "Reciper Sharer 1" achievement')
            .get(url + '/users/' + user0 + '/achievements/reciper_sharer_1')
            .expectStatus(200)
            .expectJSON({
                "id": "reciper_sharer_1",
                "package": 33,
                "desc": {
                    "en": ""
                },
                "name": {
                    "en": "Reciper Sharer 1",
                    "de": "Rezepte Teiler 1"
                },
                "icon": {
                    "en": "http://fakeimg.pl/250x250",
                    "de": "http://fakeimg.pl/250x250"
                },
                "category": "social",
                "counter": 1,
                "type": "single",
                "visibility": "normal",
                "group": "shareRecipe",
                "level": 1
            })
            .expectJSONTypes({
                "name": Object,
                "desc": Object,
                "icon": Object,
                "earnedAt": String

            })
            .toss();

        frisby.create('Getting "Reciper Sharer 2" achievement')
            .get(url + '/users/' + user0 + '/achievements/reciper_sharer_2')
            .expectStatus(200)
            .expectJSON({
                "id": "reciper_sharer_2",
                "package": 33,
                "desc": {
                    "en": ""
                },
                "name": {
                    "en": "Reciper Sharer 2",
                    "de": "Rezepte Teiler 2"
                },
                "icon": {
                    "en": "http://fakeimg.pl/250x250",
                    "de": "http://fakeimg.pl/250x250"
                },
                "category": "social",
                "counter": 5,
                "type": "progressive",
                "visibility": "normal",
                "group": "shareRecipe",
                "level": 1
            })
            .expectJSONTypes({
                "name": Object,
                "desc": Object,
                "icon": Object,
                "earnedAt": String

            })
            .toss();


        frisby.create('Getting "Reciper Sharer 3" achievement')
            .get(url + '/users/' + user0 + '/achievements/reciper_sharer_3')
            .expectStatus(200)
            .expectJSON({
                "id": "reciper_sharer_3",
                "package": 33,
                "desc": {
                    "en": ""
                },
                "name": {
                    "en": "Reciper Sharer 3",
                    "de": "Rezepte Teiler 3"
                },
                "icon": {
                    "en": "http://fakeimg.pl/250x250",
                    "de": "http://fakeimg.pl/250x250"
                },
                "category": "social",
                "counter": 10,
                "type": "progressive",
                "visibility": "normal",
                "group": "shareRecipe",
                "level": 1
            })
            .expectJSONTypes({
                "name": Object,
                "desc": Object,
                "icon": Object,
                "earnedAt": String

            })
            .toss();



        frisby.create('Getting "Reciper Sharer 4" achievement')
            .get(url + '/users/' + user0 + '/achievements/reciper_sharer_4')
            .expectStatus(200)
            .expectJSON({
                "id": "reciper_sharer_4",
                "package": 33,
                "desc": {
                    "en": ""
                },
                "name": {
                    "en": "Reciper Sharer 4",
                    "de": "Rezepte Teiler 4"
                },
                "icon": {
                    "en": "http://fakeimg.pl/250x250",
                    "de": "http://fakeimg.pl/250x250"
                },
                "category": "social",
                "counter": 15,
                "type": "progressive",
                "visibility": "normal",
                "group": "shareRecipe",
                "level": 1
            })
            .expectJSONTypes({
                "name": Object,
                "desc": Object,
                "icon": Object,
                "earnedAt": String

            })
            .toss();


        frisby.create('Deleting' + user2)
            .delete(url + '/users/' + user2)
            .expectStatus(204)
            .toss();


    });

});

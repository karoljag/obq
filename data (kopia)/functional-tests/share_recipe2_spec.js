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

    var user1 = 'user1_' + randomString({
        length: 20
    });
    var user2 = 'user2_' + randomString({
        length: 20
    });

    it("share recipe tests", function() {

        frisby.create('Getting tag')
            .get(url + '/tags/qbo')
            .expectStatus(200)
            .toss();

        frisby.create('Getting tag')
            .get(url + '/tags/badgesWithProgress')
            .expectStatus(200)
            .toss();

        //Create first user
        frisby.create('PUT first user')
            .put(url + '/users/' + user1, {
                "firstName": "FIRST",
                "confirmationState": "CONFIRMED",
                "email": "first.lee@bornholdtlee.de",
                "tags": ["qbo", "badgesWithProgress"]
            }, {
                json: true
            })
            .expectStatus(201)
            .toss();

        //Create second user
        frisby.create('PUT second user')
            .put(url + '/users/' + user2, {
                "firstName": "SECOND",
                "confirmationState": "CONFIRMED",
                "email": "second.lee@bornholdtlee.de",
                "tags": ["qbo", "badgesWithProgress"]
            }, {
                json: true
            })
            .expectStatus(201)
            .toss();

        wait(2000)

        var share;
        for (share = 0; share < 15; share++) {


            //Sending event
            frisby.create('POST event for getting share recipe  ')
                .post(url + '/users/' + user1 + '/events', {
                    "body": {
                        "tm": 3641671232,
                        "name": "brew",
                        "machineId": "uuid",
                        "version": "v1_2",
                        "capsuleId": "260",
                        "recipe": {
                            "uid": "default-1",
                            "creatorId": user2,
                            "userId": user1,
                            "userName": "Monica",
                            "name": "My coffee nr " + share,
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

        wait(2000);

        frisby.create('Getting "welcome" achievement')
            .get(url + '/users/' + user2 + '/achievements/welcome')
            .expectStatus(200)
            .expectJSON({
                "id": "welcome",
                "package": 17,
                "desc": {
                    "en": "Join the program ",
                    "de": "Dein erster Qbo-Badge hei�t dich in der qubischen Qbo-Welt willkommen. Hoffentlich schmeckt es dir hier und du lernst noch viele seiner Auszeichnungs-Kollegen kennen. Zum Beispiel, indem du schnell 10 Tassen Kaffee trinkst."
                },
                "name": {
                    "en": "Welcome Badge",
                    "de": "Willkommensbadge"
                },
                "icon": {
                    "en": "http://fakeimg.pl/250x250",
                    "de": "http://fakeimg.pl/250x250"
                },
                "category": "other",
                "counter": 1,
                "type": "onetime",
                "visibility": "standard",
                "level": 1
            })
            .expectJSONTypes({
                "name": Object,
                "desc": Object,
                "icon": Object,
                "earnedAt": String

            })
            .toss();


        frisby.create('Getting "Reciper Sharer 1" achievement')
            .get(url + '/users/' + user2 + '/achievements/reciper_sharer_1')
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
            .get(url + '/users/' + user2 + '/achievements/reciper_sharer_2')
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
            .get(url + '/users/' + user2 + '/achievements/reciper_sharer_3')
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
            .get(url + '/users/' + user2 + '/achievements/reciper_sharer_4')
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
            .delete(url+'/users/' + user2)
            .expectStatus(204)
            .toss();



    });

});

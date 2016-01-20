var frisby = require('frisby');
var jasmine = require('jasmine');
var url = process.env.url;

var bP1 = "king_of_qbo_1";
var bP5 = "king_of_qbo_2";
var bP10 = "king_of_qbo_3";
var bP15 = "king_of_qbo_4";


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


    it("baba budan tests", function() {

        frisby.create('Getting tag')
            .get(url + '/tags/qbo')
            .expectStatus(200)
            .toss();

        frisby.create('Getting tag')
            .get(url + '/tags/badgesWithProgress')
            .expectStatus(200)
            .toss();


        //Create specyfic user
        frisby.create('POST one user')
            .post(url + '/users', {
                "firstName": "UserQBO",
                "confirmationState": "CONFIRMED",
                "email": "hosun.lee@bornholdtlee.de",
                "tags": ["qbo", "badgesWithProgress"]
            }, {
                json: true
            })
            .expectStatus(201)
            .expectHeaderContains('Content-Type', 'application/json')

        .after(function(err, res, body) {
            var userID = res.headers.location;
            wait(1000);

            var coffee = 0
            while (coffee < 15) {

                frisby.create('POST event for getting "king_of_qbo"  ')
                    .post(url + userID + '/events', {
                        "body": {
                            "tm": 3641671232,
                            "name": "brew",
                            "machineId": "uuid",
                            "version": "v1_2",
                            "capsuleId": 866,
                            "recipe": {
                                "uid": "default-1",
                                "creatorId": "uuid",
                                "userId": "uuid",
                                "userName": "Monica",
                                "name": "Flat White",
                                "coffeeAmount": 10,
                                "foamAmount": 10,
                                "milkAmount": 20,
                                "cupSize": 200,
                                "creationTimestamp": 1410767140,
                                "defaultRecipe": 1,
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
                                "pretest": 1,
                                "cancelled": 1,
                                "coffeeAmount": 25,
                                "foamAmount": 10,
                                "milkAmount": 20
                            }
                        }

                    }, {
                        json: true
                    })
                    .expectStatus(202)
                    .toss();
                coffee += 1
            }

            wait(3000);

            frisby.create('Getting "welcome" achievement')
                .get(url + userID + '/achievements/welcome')
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

            wait(1000);

            frisby.create('Getting ' + bP1 + ' achievement')
                .get(url + userID + '/achievements/' + bP1)
                .expectStatus(200)
                .expectJSON({
                    "id": "king_of_qbo_1",
                    "package": 35,
                    "desc": {
                        "en": ""
                    },
                    "name": {
                        "en": "King of Qbo",
                        "de": "König der Bohnen"
                    },
                    "icon": {
                        "en": "http://fakeimg.pl/250x250",
                        "de": "http://fakeimg.pl/250x250"
                    },
                    "category": "trial",
                    "counter": 1,
                    "type": "progressive",
                    "visibility": "normal",
                    "group": "addFavoriteRecipe",
                    "level": 1
                })
                .expectJSONTypes({
                    "name": Object,
                    "desc": Object,
                    "icon": Object,
                    "earnedAt": String
                })
                .toss();

            wait(1000);

            frisby.create('Getting ' + bP5 + ' achievement')
                .get(url + userID + '/achievements/' + bP5)
                .expectStatus(200)
                .expectJSON({
                    "id": "king_of_qbo_2",
                    "package": 35,
                    "desc": {
                        "en": ""
                    },
                    "name": {
                        "en": "King of Qbo 2",
                        "de": "König der Bohnen 2"
                    },
                    "icon": {
                        "en": "http://fakeimg.pl/250x250",
                        "de": "http://fakeimg.pl/250x250"
                    },
                    "category": "trial",
                    "counter": 1,
                    "type": "progressive",
                    "visibility": "normal",
                    "group": "addFavoriteRecipe",
                    "level": 1
                })
                .expectJSONTypes({
                    "name": Object,
                    "desc": Object,
                    "icon": Object,
                    "earnedAt": String
                })
                .toss();


            wait(1000);

            frisby.create('Getting ' + bP10 + ' achievement')
                .get(url + userID + '/achievements/' + bP10)
                .expectStatus(200)
                .expectJSON({
                    "id": "king_of_qbo_3",
                    "package": 35,
                    "desc": {
                        "en": ""
                    },
                    "name": {
                        "en": "King of Qbo 3",
                        "de": "König der Bohnen 3"
                    },
                    "icon": {
                        "en": "http://fakeimg.pl/250x250",
                        "de": "http://fakeimg.pl/250x250"
                    },
                    "category": "trial",
                    "counter": 1,
                    "type": "progressive",
                    "visibility": "normal",
                    "group": "addFavoriteRecipe",
                    "level": 1
                })
                .expectJSONTypes({
                    "name": Object,
                    "desc": Object,
                    "icon": Object,
                    "earnedAt": String
                })
                .toss();

            wait(1000);

            frisby.create('Getting ' + bP15 + ' achievement')
                .get(url + userID + '/achievements/' + bP15)
                .expectStatus(200)
                .expectJSON({
                    "id": "king_of_qbo_4",
                    "package": 35,
                    "desc": {
                        "en": ""
                    },
                    "name": {
                        "en": "King of Qbo 4",
                        "de": "König der Bohnen 4"
                    },
                    "icon": {
                        "en": "http://fakeimg.pl/250x250",
                        "de": "http://fakeimg.pl/250x250"
                    },
                    "category": "trial",
                    "counter": 1,
                    "type": "progressive",
                    "visibility": "normal",
                    "group": "addFavoriteRecipe",
                    "level": 1
                })
                .expectJSONTypes({
                    "name": Object,
                    "desc": Object,
                    "icon": Object,
                    "earnedAt": String
                })
                .toss();

            frisby.create('Deleting' + userID)
                .delete(url + userID)
                .expectStatus(204)
                .toss();


        })

        .toss();


    });

});

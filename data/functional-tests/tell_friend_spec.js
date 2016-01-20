var frisby = require('frisby');
var jasmine = require('jasmine');
var url = process.env.url;


var TF5 = "qbo_ambasador_1";
var TF10 = "qbo_ambasador_2";
var TF25 = "qbo_ambasador_3";


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


    it("achievements tests", function() {

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

            var friend = 0
            while (friend < 25) {


                //Sending event
                frisby.create('POST event for getting Baba Budan  ')
                    .post(url + userID + '/events', {
                        "body": {
                            "tm": 3641671256,
                            "name": "tellFriend"
                        },
                        "tags": [
                            "qbo",
                            "badgesWithProgress"
                        ]
                    }, {
                        json: true
                    })
                    .expectStatus(202)
                    .toss();

                friend += 1
            }

            wait(3000);

            frisby.create('Getting "welcome" achievement')
                .get(url + userID + '/achievements/welcome')
                .expectStatus(200)
                .expectJSON({
                    "category": "other",
                    "package": 17,
                    "counter": 1,
                    "level": 1,
                    "visibility": "standard",
                    "type": "onetime",
                    "id": "welcome"

                })
                .expectJSONTypes({
                    "name": Object,
                    "desc": Object,
                    "icon": Object
                })

            .toss();


            frisby.create('Getting ' + TF5 + ' achievement')
                .get(url + userID + '/achievements/' + TF5)
                .expectStatus(200)
                .expectJSON({
                    "id": "qbo_ambasador_1",
                    "package": 32,
                    "desc": {
                        "en": ""
                    },
                    "name": {
                        "en": "Qbo Ambassador",
                        "de": "Qbo Botschafter"
                    },
                    "icon": {
                        "en": "http://fakeimg.pl/250x250",
                        "de": "http://fakeimg.pl/250x250"
                    },
                    "category": "social",
                    "counter": 5,
                    "type": "progressive",
                    "visibility": "normal",
                    "group": "tellFriend",
                    "level": 1
                })
                .expectJSONTypes({
                    "name": Object,
                    "desc": Object,
                    "icon": Object,
                    "earnedAt": String

                })
                .toss();



            frisby.create('Getting ' + TF10 + ' achievement')
                .get(url + userID + '/achievements/' + TF10)
                .expectStatus(200)
                .expectJSON({
                    "id": "qbo_ambasador_2",
                    "package": 32,
                    "desc": {
                        "en": ""
                    },
                    "name": {
                        "en": "Qbo Ambassador",
                        "de": "Qbo Botschafter"
                    },
                    "icon": {
                        "en": "http://fakeimg.pl/250x250",
                        "de": "http://fakeimg.pl/250x250"
                    },
                    "category": "social",
                    "counter": 10,
                    "type": "progressive",
                    "visibility": "normal",
                    "group": "tellFriend",
                    "level": 1
                })

            .expectJSONTypes({
                    "name": Object,
                    "desc": Object,
                    "icon": Object,
                    "earnedAt": String
                })
                .toss();



            frisby.create('Getting ' + TF25 + ' achievement')
                .get(url + userID + '/achievements/' + TF25)
                .expectStatus(200)
                .expectJSON({
                    "id": "qbo_ambasador_3",
                    "package": 32,
                    "desc": {
                        "en": ""
                    },
                    "name": {
                        "en": "Qbo Ambassador",
                        "de": "Qbo Botschafter"
                    },
                    "icon": {
                        "en": "http://fakeimg.pl/250x250",
                        "de": "http://fakeimg.pl/250x250"
                    },
                    "category": "social",
                    "counter": 25,
                    "type": "progressive",
                    "visibility": "normal",
                    "group": "tellFriend",
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

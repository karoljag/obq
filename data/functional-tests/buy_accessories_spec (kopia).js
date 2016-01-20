var frisby = require('frisby');
var jasmine = require('jasmine');
var url = process.env.url;

var bPaa1 = "stuff_achiever_1";
var bPaa3 = "stuff_achiever_2";
var bPaa7 = "stuff_achiever_3";

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


describe("QBO  tests", function() {


    it("QBO tests", function() {

        frisby.create('Getting tag')
            .get(url + '/tags/qbo')
            .expectStatus(200)
            .toss();

        frisby.create('Getting tag')
            .get(url + '/tags/badgesWithProgress')
            .expectStatus(200)
            .toss();



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

                //Sending event
                frisby.create('POST event for achieving all badges with buying accessory ')
                    .post(url + userID + '/events', {
                        "body": {
                            "tm": 3641671256,
                            "name": "buy",
                            "product": {
                                "name": "accessory", //coffeeCapsule, cleaningCapsule, descalingCapsule
                                "productAmount": "7",
                                "buyTimestamp": 1410767140,
                            }
                        },
                        "tags": ["qbo", "badgesWithProgress"]
                    }, {
                        json: true
                    })
                    .expectStatus(202)
                    .after(function(err, res, body) {

                        wait(1000);

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


                        frisby.create('Getting "buyProduct_accessory_amount1"')
                            .get(url + userID + '/achievements/' + bPaa1)
                            .expectStatus(200)
                            .expectJSON({
                                "category": "frequency",
                                "id": "stuff_achiever_1",

                                "package": 36,
                                "group": "buy",
                                "counter": 1,
                                "level": 1,
                                "visibility": "normal",

                                "type": "progressive",
                            })
                            .expectJSONTypes({
                                "name": Object,
                                "desc": Object,
                                "icon": Object
                            })
                            .toss();

                        frisby.create('Getting "buyProduct_accessory_amount3"')
                            .get(url + userID + '/achievements/' + bPaa3)
                            .expectStatus(200)
                            .expectJSON({
                                "category": "frequency",
                                "id": "stuff_achiever_2",

                                "package": 36,
                                "group": "buy",
                                "counter": 3,
                                "level": 1,
                                "visibility": "normal",

                                "type": "progressive",
                            })
                            .expectJSONTypes({
                                "name": Object,
                                "desc": Object,
                                "icon": Object
                            })
                            .toss();

                        frisby.create('Getting "buyProduct_accessory_amount7"')
                            .get(url + userID + '/achievements/' + bPaa7)
                            .expectStatus(200)
                            .expectJSON({
                                "category": "frequency",
                                "id": "stuff_achiever_3",

                                "package": 36,
                                "group": "buy",
                                "counter": 7,
                                "level": 1,
                                "visibility": "normal",

                                "type": "progressive",
                            })
                            .expectJSONTypes({
                                "name": Object,
                                "desc": Object,
                                "icon": Object
                            })
                            .toss();

                        frisby.create('Deleting' + userID)
                            .delete(url + userID)
                            .expectStatus(204)
                            .toss();


                    })

                .toss();


            })

        .toss();

    });

});

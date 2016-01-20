var frisby = require('frisby');
var jasmine = require('jasmine');
var url = process.env.url;

var lR5 = "rinse_master_1";
var lR10 = "rinse_master_2";
var lR15 = "rinse_master_3";


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

describe("User achievements suite", function() {


    it("QBO first tests", function() {

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


                var rinse = 0
                while (rinse < 15) {

                    //Sending event
                    frisby.create('POST event for getting rinse achievements')
                        .post(url + userID + '/events', {
                                "body": {

                                    "tm": 3641671243,
                                    "name": "longRinse"

                                },

                                "tags": ["qbo", "badgesWithProgress"]
                            }

                            , {
                                json: true
                            })
                        .expectStatus(202)
                        .toss();

                    rinse += 1
                }


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
                    .toss()


                frisby.create('Getting ' + lR5 + ' achievements')
                    .get(url + userID + '/achievements/' + lR5)
                    .expectStatus(200)
                    .expectJSON({
                        "id": "rinse_master_1",
                        "package": 1,
                        "desc": {
                            "en": "Milk rinse long 5x"
                        },
                        "name": {
                            "en": "Rinse master",
                            "de": "missing_translation"
                        },
                        "icon": {
                            "en": "http://fakeimg.pl/250x250",
                            "de": "http://fakeimg.pl/250x250"
                        },
                        "category": "main",
                        "counter": 5,
                        "type": "progressive",
                        "visibility": "surprise",
                        "group": "usage",
                        "level": 1
                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object,
                        "earnedAt": String
                    })
                    .toss();

                frisby.create('Getting ' + lR10 + ' achievements')
                    .get(url + userID + '/achievements/' + lR10)
                    .expectStatus(200)
                    .expectJSON({
                        "id": "rinse_master_2",
                        "package": 1,
                        "desc": {
                            "en": "Milk rinse long 10x"
                        },
                        "name": {
                            "en": "Rinse master",
                            "de": "missing_translation"
                        },
                        "icon": {
                            "en": "http://fakeimg.pl/250x250",
                            "de": "http://fakeimg.pl/250x250"
                        },
                        "category": "main",
                        "counter": 10,
                        "type": "progressive",
                        "visibility": "surprise",
                        "group": "usage",
                        "level": 1
                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object,
                        "earnedAt": String


                    })

                .toss();

                frisby.create('Getting ' + lR15 + ' achievements')
                    .get(url + userID + '/achievements/' + lR15)
                    .expectStatus(200)
                    .expectJSON({
                        "id": "rinse_master_3",
                        "package": 1,
                        "desc": {
                            "en": "Milk rinse long 15x"
                        },
                        "name": {
                            "en": "Rinse master",
                            "de": "missing_translation"
                        },
                        "icon": {
                            "en": "http://fakeimg.pl/250x250",
                            "de": "http://fakeimg.pl/250x250"
                        },
                        "category": "main",
                        "counter": 15,
                        "type": "progressive",
                        "visibility": "surprise",
                        "group": "usage",
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

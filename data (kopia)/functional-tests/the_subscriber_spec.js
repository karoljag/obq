var frisby = require('frisby');
var jasmine = require('jasmine');
var url = process.env.url;

var sub = "the_subscriber";

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
        wait(1000);

        frisby.create('Getting tag')
            .get(url + '/tags/badgesWithProgress')
            .expectStatus(200)
            .toss();

        wait(1000);

        //Create specyfic user
        frisby.create('POST one user')
            .post(url + '/users', {
                "firstName": "UserQBO",
                "confirmationState": "CONFIRMED",
                "optInConfirmed": true,
                "email": "hosun.lee@bornholdtlee.de",
                "tags": ["qbo", "badgesWithProgress"]
            }, {
                json: true
            })
            .expectStatus(201)
            .expectHeaderContains('Content-Type', 'application/json')

        .after(function(err, res, body) {
                var userID = res.headers.location;

                //Sending event
                frisby.create('POST event for getting The subscriber  ')
                    .post(url + userID + '/events', {
                        "body": {

                            "tm": 3641671256,
                            "name": "subscribeNL"

                        },
                        "tags": ["qbo", "badgesWithProgress"]
                    }, {
                        json: true
                    })
                    .expectStatus(202)
                    .after(function(err, res, body) {

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

                        frisby.create('Getting "subscriber" achievement')
                            .get(url + userID + '/achievements/' + sub)
                            .expectStatus(200)
                            .expectJSON({
                                "id": "the_subscriber",
                                "package": 21,
                                "desc": {
                                    "en": "Subscribe to product information NL",
                                    "de": "Keine Frage, du bist immer auf dem neusten Stand der Technik! Aber seit deiner Anmeldung f�r unsere Qbo-Post bist du jetzt auch immer auf dem neusten Stand des guten Geschmacks."
                                },
                                "name": {
                                    "en": "The subscriber",
                                    "de": "Qbo-Post"
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

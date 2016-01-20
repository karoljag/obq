var frisby = require('frisby');
var jasmine = require('jasmine');
var url = process.env.url;


bPdC2 = "descale_sheriff_1";
bPdC4 = "descale_sheriff_2";
bPdC8 = "descale_sheriff_3";


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

            //Sending event
            frisby.create('POST 8x event for achieving all badges with buying accessory ')
                .post(url + userID + '/events', {
                    "body": {
                        "tm": 3641671256,
                        "name": "buy",
                        "product": {
                            "name": "descalingCapsule",
                            "productAmount": "8",
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

                    frisby.create('Getting :' + bPdC2)
                        .get(url + userID + '/achievements/' + bPdC2)
                        .expectStatus(200)
                        .expectJSON({
                            "id": "descale_sheriff_1",
                            "package": 38,
                            "desc": {
                                "en": "Yes! You won the first round \"lime vs. Coffee\" in favor of your machine, coffee and milk froth. Keep going.",
                                "de": "Yes! Die erste Runde im Kampf \"Kalk vs. Kaffee\" hast du zugunsten von Maschine, Kaffee und Milchschaum entschieden. Weiter so."
                            },
                            "name": {
                                "en": "Descale Sheriff",
                                "de": "Entalkungssheriff"
                            },
                            "icon": {
                                "en": "http://fakeimg.pl/250x250",
                                "de": "http://fakeimg.pl/250x250"
                            },
                            "category": "frequency",
                            "counter": 2,
                            "type": "progressive",
                            "visibility": "normal",
                            "group": "buy",
                            "level": 1
                        })
                        .expectJSONTypes({
                            "name": Object,
                            "desc": Object,
                            "icon": Object,
                            "earnedAt": String
                        })
                        .toss();


                    frisby.create('Getting :' + bPdC4)
                        .get(url + userID + '/achievements/' + bPdC4)
                        .expectStatus(200)
                        .expectJSON({
                            "id": "descale_sheriff_2",
                            "package": 38,
                            "desc": {
                                "en": "Just in time! The second round \"lime vs. Coffee\" was also decided in favor of you. It is all about timing.",
                                "de": "Gerade rechtzeitig! Auch die zweite Runde der Begegnung \"Kalk vs. Kaffee\" hast du f�r dich entschieden. Timing bedeutet hier alles."
                            },
                            "name": {
                                "en": "Descale Sheriff",
                                "de": "Entalkungssheriff"
                            },
                            "icon": {
                                "en": "http://fakeimg.pl/250x250",
                                "de": "http://fakeimg.pl/250x250"
                            },
                            "category": "frequency",
                            "counter": 4,
                            "type": "progressive",
                            "visibility": "normal",
                            "group": "buy",
                            "level": 1
                        })
                        .expectJSONTypes({
                            "name": Object,
                            "desc": Object,
                            "icon": Object,
                            "earnedAt": String
                        })
                        .toss();

                    frisby.create('Getting :' + bPdC8)
                        .get(url + userID + '/achievements/' + bPdC8)
                        .expectStatus(200)
                        .expectJSON({
                            "id": "descale_sheriff_3",
                            "package": 38,
                            "desc": {
                                "en": "The third round \"lime vs. Coffee\" again is on you. The audience is thrilled!",
                                "de": "Die dritte Runde im Kampf \"Kalk vs. Kaffee\" geht schon wieder an dich. Das Publikum ist begeistert! "
                            },
                            "name": {
                                "en": "Descale Sheriff",
                                "de": "Entalkungssheriff"
                            },
                            "icon": {
                                "en": "http://fakeimg.pl/250x250",
                                "de": "http://fakeimg.pl/250x250"
                            },
                            "category": "frequency",
                            "counter": 8,
                            "type": "progressive",
                            "visibility": "normal",
                            "group": "buy",
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

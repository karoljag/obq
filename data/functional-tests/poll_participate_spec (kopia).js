var frisby = require('frisby');
var jasmine = require('jasmine');
var url = process.env.url;

var poPart = "opinion_share";

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

              
                //Sending event
                frisby.create('POST event for getting "polParticipate"')
                    .post(url + userID + '/events', {
                        "body": {
                            "tm": 3641671256,
                            "name": "pollParticipate"
                        },
                        "tags": ["qbo", "badgesWithProgress"]
                    }, {
                        json: true
                    })
                    .expectStatus(202)
                    .toss();


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


                frisby.create('Getting ' + poPart + ' achievements')
                    .get(url + userID + '/achievements/' + poPart)
                    .expectStatus(200)
                    .expectJSON({
                        "id": "opinion_share",
                        "package": 29,
                        "desc": {
                            "en": "Participate in poll"
                        },
                        "name": {
                            "en": "Opinion Share",
                            "de": "Meinungsf�hrer"
                        },
                        "icon": {
                            "en": "http://fakeimg.pl/250x250",
                            "de": "http://fakeimg.pl/250x250"
                        },
                        "category": "other",
                        "counter": 1,
                        "type": "onetime",
                        "visibility": "normal",
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

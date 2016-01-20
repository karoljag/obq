var frisby = require('frisby');
var jasmine = require('jasmine');
var url = process.env.url;

var estradaParaiso1 = "estrada_paraiso_tester";
var estradaParaiso10 = "estrada_paraiso_fan_1";
var estradaParaiso30 = "estrada_paraiso_fan_2";
var estradaParaiso70 = "estrada_paraiso_fan_3";

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


    it("estrada Paraiso tests", function() {

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

            var coffee = 0
            while (coffee < 70) {

              //Sending event
            frisby.create('POST event for getting Estrada Paraiso  ')
                .post(url + userID + '/events', {
                    "body": {
                        "tm": 3641671232,
                        "name": "brew",
                        "machineId": "uuid",
                        "version": "v1_2",
                        "capsuleId": "390",
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
                            "cancelled": 1,
                            "coffeeAmount": 21,
                            "foamAmount": 1,
                            "milkAmount": 1
                        },
                        "favouriteCapsuleId": 866
                    }

                }, {
                    json: true
                })
                .expectStatus(202)
                .toss();

                coffee += 1

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

            .toss();

            frisby.create('Getting ' + estradaParaiso1 + ' achievement')
                .get(url + userID + '/achievements/' + estradaParaiso1)
                .expectStatus(200)
                .expectJSON({
                    "id": "estrada_paraiso_tester",
                    "package": 5,
                    "desc": {
                        "en": "Congratulations on your maiden trip with the Estrada Paraiso. The arabica grows along a rail track dating back to the 19th century. If you are out of ideas this is the perfect short cut to bring your project plan back on track - ideally as milk coffee.",
                        "de": "Gl�ckwunsch zur Jungfernfahrt mit dem Kaffeezug.  Fr�her transportierte der Estrada del Ferro den Kaffee in die Welt, heute bringen wir mit dem Estrade Paraiso die Ideen zu dir� am besten als leckerer Milchkaffee."
                    },
                    "name": {
                        "en": "Estrada Paraiso Tester",
                        "de": "Estrada Paraiso Tester"
                    },
                    "icon": {
                        "en": "http://fakeimg.pl/250x250",
                        "de": "http://fakeimg.pl/250x250"
                    },

                    "category": "frequency",
                    "counter": 1,
                    "type": "progressive",
                    "visibility": "standard",
                    "group": "brew",
                    "level": 1
                })

            .expectJSONTypes({
                    "name": Object,
                    "desc": Object,
                    "icon": Object,
                    "earnedAt": String
                })
                .toss();

            frisby.create('Getting ' + estradaParaiso10 + ' achievement')
                .get(url + userID + '/achievements/' + estradaParaiso10)
                .expectStatus(200)
                .expectJSON({
                    "id": "estrada_paraiso_fan_1",
                    "package": 5,
                    "desc": {
                        "en": "",
                        "de": "Du hast jetzt zehn Fahrten im Estrada Paraiso unternommen. Manche sogar schwarz? Kein Problem mit dem abwechslungsreichen Arabica, der entlang einer Eisenbahnlinie wuchs."
                    },
                    "name": {
                        "en": "Estrada Paraiso Fan",
                        "de": "Estrada Paraiso Fan"
                    },
                    "icon": {
                        "en": "http://fakeimg.pl/250x250",
                        "de": "http://fakeimg.pl/250x250"
                    },

                    "category": "frequency",
                    "counter": 10,
                    "type": "progressive",
                    "visibility": "standard",
                    "group": "brew",
                    "level": 1
                })

            .expectJSONTypes({
                    "name": Object,
                    "desc": Object,
                    "icon": Object,
                    "earnedAt": String
                })
                .toss();

            frisby.create('Getting ' + estradaParaiso30 + ' achievement')
                .get(url + userID + '/achievements/' + estradaParaiso30)
                .expectStatus(200)
                .expectJSON({
                    "id": "estrada_paraiso_fan_2",
                    "package": 5,
                    "desc": {
                        "en": "",
                        "de": "Schon 30 Mal mit dem Estrada Paraiso gefahren und immer noch begeistert? Der Arabica  bietet ja auch jede Menge Abwechslung: zum Beispiel als Milchkaffee, Frapp� oder Eiscaf�. "
                    },
                    "name": {
                        "en": "Estrada Paraiso Fan",
                        "de": "Estrada Paraiso Fan"
                    },
                    "icon": {
                        "en": "http://fakeimg.pl/250x250",
                        "de": "http://fakeimg.pl/250x250"
                    },

                    "category": "frequency",
                    "counter": 30,
                    "type": "progressive",
                    "visibility": "standard",
                    "group": "brew",
                    "level": 1
                })

            .expectJSONTypes({
                    "name": Object,
                    "desc": Object,
                    "icon": Object,
                    "earnedAt": String
                })
                .toss();


            frisby.create('Getting ' + estradaParaiso70 + ' achievement')
                .get(url + userID + '/achievements/' + estradaParaiso70)
                .expectStatus(200)
                .expectJSON({
                    "id": "estrada_paraiso_fan_3",
                    "package": 5,
                    "desc": {
                        "en": "Wow, by now you are a frequent traveller with the Estrada Paraiso, the delicious arabica that grows along a rail track dating back to the 19th century. If you are running out of ideas this coffee will bring you back on track, for example as iced coffee.",
                        "de": "Schon 70 Tassen! Du bist ja voll auf den Estrada Paraiso eingestiegen: den Arabica, der urspr�nglich an einer Eisenbahnlinie wuchs und der heute deine Ideen in Fahrt bringt."
                    },
                    "name": {
                        "en": "Estrada Paraiso Fan",
                        "de": "Estrada Paraiso Fan"
                    },
                    "icon": {
                        "en": "http://fakeimg.pl/250x250",
                        "de": "http://fakeimg.pl/250x250"
                    },

                    "category": "frequency",
                    "counter": 70,
                    "type": "progressive",
                    "visibility": "standard",
                    "group": "brew",
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

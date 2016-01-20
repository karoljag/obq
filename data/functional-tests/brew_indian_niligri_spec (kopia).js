var frisby = require('frisby');
var jasmine = require('jasmine');
var url = process.env.url;

var indianNiligri1 = "indian_niligri_tester";
var indianNiligri10 = "indian_niligri_fan_1";
var indianNiligri30 = "indian_niligri_fan_2";
var indianNiligri70 = "indian_niligri_fan_3";

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


    it("indian Niligri tests", function() {

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
          
            var coffee = 0;
            while (coffee < 70) {

                //Sending event
            frisby.create('POST event for getting Indian Niligri ')
                .post(url + userID + '/events', {
                    "body": {
                        "tm": 3641671232,
                        "name": "brew",
                        "machineId": "uuid",
                        "version": "v1_2",
                        "capsuleId": "866",
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


            frisby.create('Getting ' + indianNiligri1 + ' achievement')
                .get(url + userID + '/achievements/' + indianNiligri1)
                .expectStatus(200)
                .expectJSON({
                    "id": "indian_niligri_tester",
                    "package": 8,
                    "desc": {
                        "en": "You just enjoyed a cup of dark espresso from the dark blue Nigiri mountains. The peppery touch of the Indian Nilgiri evokes the best idea in you or simply i ts thrength as a cappuccion.",
                        "de": "Du hast gerade tiefschwarzen Espresso aus den tiefblauen Nilgiri-Bergen getrunken. Mit leichter Pfeffernote kitzelt der Indian Nilgiri jederzeit die besten Ideen aus dir heraus �� oder entfaltet seine St�rke im Cappuccino."
                    },
                    "name": {
                        "en": "Indian Nilgiri Tester",
                        "de": "Indian Nilgiri Tester"
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

            frisby.create('Getting ' + indianNiligri10 + ' achievement')
                .get(url + userID + '/achievements/' + indianNiligri10)
                .expectStatus(200)
                .expectJSON({
                    "id": "indian_niligri_fan_1",
                    "package": 8,
                    "desc": {
                        "en": "",
                        "de": "Blaue Berge, schwarzer Kaffee! Nach zehn Indian Nilgiri wei�t du allerdings, dass diese Sorte auch als hellbrauner Cappuccino ihren Reiz hat."
                    },
                    "name": {
                        "en": "Indian Nilgiri Fan",
                        "de": "Indian Nilgiri Fan"
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

            frisby.create('Getting ' + indianNiligri30 + ' achievement')
                .get(url + userID + '/achievements/' + indianNiligri30)
                .expectStatus(200)
                .expectJSON({
                    "id": "indian_niligri_fan_2",
                    "package": 8,
                    "desc": {
                        "en": "",
                        "de": "Selbst dein 30. Indian Nilgiri kommt noch leicht pfeffrig daher. So verleiht er jedem Cappuccino einen besonderen Pfiff. Zucker jetzt aber bitte nicht durch Salz ersetzen!"
                    },
                    "name": {
                        "en": "Indian Nilgiri Fan",
                        "de": "Indian Nilgiri Fan"
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


            frisby.create('Getting ' + indianNiligri70 + ' achievement')
                .get(url + userID + '/achievements/' + indianNiligri70)
                .expectStatus(200)
                .expectJSON({
                    "id": "indian_niligri_fan_3",
                    "package": 8,
                    "desc": {
                        "en": "",
                        "de": "Oben auf den Nilgiri Bergen ist es immer etwas k�hler als im Flachland S�dindiens. In der YOU-RISTA heizen wir ihm dann richtig ein. Das hindert dich aber auch nach dem 70. Indian Nilgiri nicht daran, ihm wieder eine Abk�hlung zu verpassen � denn er kann beides super: hei� oder kalt!"
                    },
                    "name": {
                        "en": "Indian Nilgiri Fan",
                        "de": "Indian Nilgiri Fan"
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

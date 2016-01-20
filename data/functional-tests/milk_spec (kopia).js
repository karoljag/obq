var frisby = require('frisby');
var jasmine = require('jasmine');
var url = process.env.url;

var miCo3000 = "milk_fan_1";
var miCo10000 = "milk_fan_2";
var miCo30000 = "milk_fan_3";
var miCo100000 = "milk_fan_4";


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


    it("jebena Yirga tests", function() {

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

            while (coffee < 400) {
            //Sending event
            frisby.create('POST event for getting Jebena Yirga  ')
                .post(url + userID + '/events', {
                    "body": {
                        "tm": 3641671232,
                        "name": "brew",
                        "machineId": "uuid",
                        "version": "v1_2",
                        "capsuleId": "cof3",
                        "recipe": {
                            "uid": "default-1",
                            "creatorId": "uuid",
                            "userId": "uuid",
                            "userName": "Monica",
                            "name": "Flat White",
                            "coffeeAmount": 10,
                            "foamAmount": 10,
                            "milkAmount": 250,
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
                            "milkAmount": 250
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


            frisby.create('Getting ' + miCo3000 + ' achievement')
                .get(url + userID + '/achievements/' + miCo3000)
                .expectStatus(200)
                .expectJSON({
                    "id": "milk_fan_1",
                    "package": 13,
                    "desc": {
                        "en": "",
                        "de": "1,5 Liter hast du bis jetzt schon durch deinen Milk Master gejagt. Das finden wir sehr Lactose tolerant."
                    },
                    "name": {
                        "en": "Milk fan",
                        "de": "Milk fan"
                    },
                    "icon": {
                        "en": "http://fakeimg.pl/250x250",
                        "de": "http://fakeimg.pl/250x250"
                    },
                    "category": "frequency",
                    "counter": 3000,
                    "type": "progressive",
                    "visibility": "normal",
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

            frisby.create('Getting ' + miCo10000 + ' achievement')
                .get(url + userID + '/achievements/' + miCo10000)
                .expectStatus(200)
                .expectJSON({
                    "id": "milk_fan_2",
                    "package": 13,
                    "desc": {
                        "en": "",
                        "de": "Wow, dein Milk Master hat schon 5 Liter Milch durchgeschleust! Gibst du heimlich Milchschaum-Parties? "
                    },
                    "name": {
                        "en": "Milk fan",
                        "de": "Milk fan"
                    },
                    "icon": {
                        "en": "http://fakeimg.pl/250x250",
                        "de": "http://fakeimg.pl/250x250"
                    },
                    "category": "frequency",
                    "counter": 10000,
                    "type": "progressive",
                    "visibility": "normal",
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

            frisby.create('Getting ' + miCo30000 + ' achievement')
                .get(url + userID + '/achievements/' + miCo30000)
                .expectStatus(200)
                .expectJSON({
                    "id": "milk_fan_3",
                    "package": 13,
                    "desc": {
                        "en": "",
                        "de": "10 Liter Milch? Mal ganz ehrlich! Trinkst du Kaffee mit Milch oder Milch mit Kaffee?"
                    },
                    "name": {
                        "en": "Milk fan",
                        "de": "Milk fan"
                    },
                    "icon": {
                        "en": "http://fakeimg.pl/250x250",
                        "de": "http://fakeimg.pl/250x250"
                    },
                    "category": "frequency",
                    "counter": 30000,
                    "type": "progressive",
                    "visibility": "normal",
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

            frisby.create('Getting ' + miCo100000 + ' achievement')
                .get(url + userID + '/achievements/' + miCo100000)
                .expectStatus(200)
                .expectJSON({
                    "id": "milk_fan_4",
                    "package": 13,
                    "desc": {
                        "en": "",
                        "de": "Ein schwarzer Tag f�r schwarzen Kaffee: Heute hast du die 20 Liter-Milch-Marke geknackt. "
                    },
                    "name": {
                        "en": "Milk fan",
                        "de": "Milk fan"
                    },
                    "icon": {
                        "en": "http://fakeimg.pl/250x250",
                        "de": "http://fakeimg.pl/250x250"
                    },
                    "category": "frequency",
                    "counter": 100000,
                    "type": "progressive",
                    "visibility": "surprise",
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

            // frisby.create('Deleting' + userID)
            //     .delete(url + userID)
            //     .expectStatus(204)
            //     .toss();
        })

        .toss();

    });

});

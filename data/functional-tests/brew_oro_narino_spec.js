var frisby = require('frisby');
var jasmine = require('jasmine');
var url = process.env.url;

var oroNarino_amount1 = "oro_narino_tester";
var oroNarino_amount10 = "oro_narino_fan_1";
var oroNarino_amount30 = "oro_narino_fan_2";
var oroNarino_amount70 = "oro_narino_fan_3";

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

    it("oro narino tests", function() {

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
            frisby.create('POST event for getting Oro Narino')
                .post(url + userID + '/events', {
                    "body": {
                        "tm": 3641671232,
                        "name": "brew",
                        "machineId": "uuid",
                        "version": "v1_2",
                        "capsuleId": "801",
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

            frisby.create('Getting ' + oroNarino_amount1 + ' achievement')
                .get(url + userID + '/achievements/' + oroNarino_amount1)
                .expectStatus(200)
                .expectJSON({
                    "id": "oro_narino_tester",
                    "package": 4,
                    "desc": {
                        "en": "Do did invest your money wisely: in gold. One brewed capsule of our Oro Narino might not rise in value but increases the value of each cappuccino, cafe au lait or frappe.",
                        "de": "Das war mal eine richtig gute Anlage: Eine Kapsel voll Kaffee-Gold. Du wirst sehen, dass diese Anlage in unseren Oro Nari?o in Null Komma nichts den Wert jedes Cappuccinos, Caf� au Laits oder Frapp�s steigert. Wir hoffen, du bist bereit Kaffeemillion�r zu werden. "
                    },
                    "name": {
                        "en": "Oro Narino Tester",
                        "de": "Oro Narino Tester"
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

            frisby.create('Getting ' + oroNarino_amount10 + ' achievement')
                .get(url + userID + '/achievements/' + oroNarino_amount10)
                .expectStatus(200)
                .expectJSON({
                    "id": "oro_narino_fan_1",
                    "package": 4,
                    "desc": {
                        "en": "",
                        "de": "Fr�her hast du einfach nur Espresso getrunken. Jetzt hast du schon zehn Tassen fl�ssiges Gold probiert. Und unser Oro Nari?o bereichert deine Kaffeestunden immer weiter"
                    },
                    "name": {
                        "en": "Oro Narino Fan",
                        "de": "Oro Narino Fan"
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

            frisby.create('Getting ' + oroNarino_amount30 + ' achievement')
                .get(url + userID + '/achievements/' + oroNarino_amount30)
                .expectStatus(200)
                .expectJSON({
                    "id": "oro_narino_fan_2",
                    "package": 4,
                    "desc": {
                        "en": "",
                        "de": "Selbst nach 30 T�sschen ist es noch eine geniale Idee mit unserem Oro Nari?o deine Kaffeevariationen zu vergolden. Das tolle daran: es gibt noch unz�hlige Investment M�glichkeiten in viele neue Kaffeerezepte, in denen du die Milch mit bestem Espresso bereichern kannst. "
                    },
                    "name": {
                        "en": "Oro Narino Fan",
                        "de": "Oro Narino Fan"
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

            frisby.create('Getting ' + oroNarino_amount70 + ' achievement')
                .get(url + userID + '/achievements/' + oroNarino_amount70)
                .expectStatus(200)
                .expectJSON({
                    "id": "oro_narino_fan_3",
                    "package": 4,
                    "desc": {
                        "en": "",
                        "de": "Lecker! Auch nach 70 Kapseln ist der Oro Nari?o immer noch goldrichtig, um damit k�stlichen Cappuccino, Frapp� oder Caf� au Lait zu kreieren. "
                    },
                    "name": {
                        "en": "Oro Narino Fan",
                        "de": "Oro Narino Fan"
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

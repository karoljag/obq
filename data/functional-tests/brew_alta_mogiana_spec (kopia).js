var frisby = require('frisby');
var jasmine = require('jasmine');
var url = process.env.url;

var altaMogiana_amount1 = "alta_mogiana_tester";
var altaMogiana_amount10 = "alta_mogiana_fan_1";
var altaMogiana_amount30 = "alta_mogiana_fan_2";
var altaMogiana_amount70 = "alta_mogiana_fan_3";

function wait(t1) {
    // t1,t2- miliseconds
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

    it("alta Mogiana tests", function() {

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
            frisby.create('POST event for getting Alta Mogiana  ')
                .post(url + userID + '/events', {
                    "body": {
                        "tm": 3641671232,
                        "name": "brew",
                        "machineId": "uuid",
                        "version": "v1_2",
                        "capsuleId": "65",
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


            frisby.create('Getting ' + altaMogiana_amount1 + ' achievement')
                .get(url + userID + '/achievements/' + altaMogiana_amount1)
                .expectStatus(200)
                .expectJSON({
                    "id": "alta_mogiana_tester",
                    "package": 2,
                    "desc": {
                        "en": "",
                        "de": "Unser Alta Mogiana existiert auf ganz anderen Ebenen � hoch oben! Dieser �berflieger l�sst sich nicht gerne einfangen, ist aber sehr bek�mmlich wenn man ihn erst einmal hat. "
                    },
                    "name": {
                        "en": "Alta Mogiana Tester",
                        "de": "Alta Mogiana Tester"
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

            frisby.create('Getting ' + altaMogiana_amount10 + ' achievement')
                .get(url + userID + '/achievements/' + altaMogiana_amount10)
                .expectStatus(200)
                .expectJSON({
                    "id": "alta_mogiana_fan_1",
                    "package": 2,
                    "desc": {
                        "en": "",
                        "de": "Der Alta Mogiana liebt es hoch. Dort ist die Luft d�nn und k�hl � genau richtig um einen k�hlen Kopf zu bewahren. Mit den weichen R�stnoten dieses Caff?s sicher auch kein Problem �ber Tasse 10 hinaus!"
                    },
                    "name": {
                        "en": "Alta Mogiana Fan",
                        "de": "Alta Mogiana Fan"
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

            frisby.create('Getting ' + altaMogiana_amount30 + ' achievement')
                .get(url + userID + '/achievements/' + altaMogiana_amount30)
                .expectStatus(200)
                .expectJSON({
                    "id": "alta_mogiana_fan_2",
                    "package": 2,
                    "desc": {
                        "en": "",
                        "de": "Tasse 30 und unser Alta Mogiana hat es nun offiziell auf deinen Thron der Lieblingskaffees geschafft. Du �brigens auch auf Qbo�s Thron! Lasst euch doch einfach noch ein paar mal hochleben � am besten miteinander! "
                    },
                    "name": {
                        "en": "Alta Mogiana Fan",
                        "de": "Alta Mogiana Fan"
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

            frisby.create('Getting ' + altaMogiana_amount70 + ' achievement')
                .get(url + userID + '/achievements/' + altaMogiana_amount70)
                .expectStatus(200)
                .expectJSON({
                    "id": "alta_mogiana_fan_3",
                    "package": 2,
                    "desc": {
                        "en": "",
                        "de": "Heute auf Wolke 7? Mal 10! Denn heute hast du deine 70. Tasse Alta Mogiana erreicht, und damit das Base Camp dieser Kaffeebergbesteigung l�ngst hinter dir gelassen. Mit dem richtigen Kaffee schaffst du es bestimmt noch zum Gipfel, zur besten Aussicht!"
                    },
                    "name": {
                        "en": "Alta Mogiana Fan",
                        "de": "Alta Mogiana Fan"
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

var frisby = require('frisby');
var jasmine = require('jasmine');
var url = process.env.url;

var buenaEnteta1 = "buena_enteta_tester";
var buenaEnteta10 = "buena_enteta_fan_1";
var buenaEnteta30 = "buena_enteta_fan_2";
var buenaEnteta70 = "buena_enteta_fan_3";

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


    it("buena Enteta tests", function() {

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
            var coffee = 0;

            while (coffee < 70) {


                
            //Sending event
            frisby.create('POST event for getting Buena Enteta  ')
                .post(url + userID + '/events', {
                    "body": {
                        "tm": 3641671232,
                        "name": "brew",
                        "machineId": "uuid",
                        "version": "v1_2",
                        "capsuleId": "130",
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
            wait(3000);

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

            frisby.create('Getting ' + buenaEnteta1 + ' achievement')
                .get(url + userID + '/achievements/' + buenaEnteta1)
                .expectStatus(200)
                .expectJSON({
                    "id": "buena_enteta_tester",
                    "package": 6,
                    "desc": {
                        "en": "",
                        "de": "Buna Enteta nimmt sich gern die Zeit mit dir um die Welt stehen zu lassen! Buna ist nach der �thiopischen Kaffeezeremonie benannt � eine Einladung zu dieser Zeremonie ist Zeichen von Freundschaft und Respekt.  Wir freuen uns, dass du die Einladung angenommen hast!"
                    },
                    "name": {
                        "en": "Buena Enteta Tester",
                        "de": "Buena Enteta Tester"
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



            frisby.create('Getting ' + buenaEnteta10 + ' achievement')
                .get(url + userID + '/achievements/' + buenaEnteta10)
                .expectStatus(200)
                .expectJSON({
                    "id": "buena_enteta_fan_1",
                    "package": 6,
                    "desc": {
                        "en": "",
                        "de": "Buna Enteta geht zu jeder Zeit! In den Genuss dieser �thiopien inspirierten Sorte bist du nun schon 10 mal gekommen, und wir feiern diesen Caff? immer wieder gerne mit dir. Bereit f�r deine n�chste Einladung?   "
                    },
                    "name": {
                        "en": "Buena Enteta Fan",
                        "de": "Buena Enteta Fan"
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

            frisby.create('Getting ' + buenaEnteta30 + ' achievement')
                .get(url + userID + '/achievements/' + buenaEnteta30)
                .expectStatus(200)
                .expectJSON({
                    "id": "buena_enteta_fan_2",
                    "package": 6,
                    "desc": {
                        "en": "",
                        "de": "30 Kaffeezeremonien weiter und du hattest hoffentlich viel Zeit jede einzelne zu genie�en. Wir laden dich ein, die Welt des Buna Enteta noch weiter zu entdecken!"
                    },
                    "name": {
                        "en": "Buena Enteta Fan",
                        "de": "Buena Enteta Fan"
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


            frisby.create('Getting ' + buenaEnteta70 + ' achievement')
                .get(url + userID + '/achievements/' + buenaEnteta70)
                .expectStatus(200)
                .expectJSON({
                    "id": "buena_enteta_fan_3",
                    "package": 6,
                    "desc": {
                        "en": "",
                        "de": "Du bist ein alter Hase in �thiopischer Kaffee Kultur � �brigens auch das Mutterland des Kaffees. Mit Buna Enteta gehst du damit ganz an den Ursprung des Kaffees zur�ck und nach 70 Tassen kannst Du Dich bereits einen echten Meister dieser alten Kaffeezeremonie nennen."
                    },
                    "name": {
                        "en": "Buena Enteta Fan",
                        "de": "Buena Enteta Fan"
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

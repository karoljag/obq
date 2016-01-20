var frisby = require('frisby');
var jasmine = require('jasmine');
var url = process.env.url;

var volcanesAntigua1 = "volcanes_antigua_tester";
var volcanesAntigua10 = "volcanes_antigua_fan_1";
var volcanesAntigua30 = "volcanes_antigua_fan_2";
var volcanesAntigua70 = "volcanes_antigua_fan_3";

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


    it("volcanes antigua tests", function() {

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
            frisby.create('POST event for getting Volcanes Antigua  ')
                .post(url + userID + '/events', {
                    "body": {
                        "tm": 3641671232,
                        "name": "brew",
                        "machineId": "uuid",
                        "version": "v1_2",
                        "capsuleId": "195",
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

            frisby.create('Getting ' + volcanesAntigua1 + ' achievement')
                .get(url + userID + '/achievements/' + volcanesAntigua1)
                .expectStatus(200)
                .expectJSON({
                    "id": "volcanes_antigua_tester",
                    "package": 3,
                    "desc": {
                        "en": "You are right: your first volcanic eruption had a taste of chocolate. Grown on rich lava grounds Volcanes Antigua is full of spirit. Just the right one if you need a creative eruption.",
                        "de": "Du hast richtig geschmeckt: dein erster Vulkanausbruch ist sinnlich-bitter-s�ss. Gewachsen auf kraftvollen Lavab�den ist der Volcanes Antigua echt temperamentvoll. Genau richtig, wenn du mal wieder ein paar Ideen sprudeln lassen m�chtest."
                    },
                    "name": {
                        "en": "Volcanes Antigua Tester",
                        "de": "Volcanes Antigua Tester"
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

            frisby.create('Getting ' + volcanesAntigua10 + ' achievement')
                .get(url + userID + '/achievements/' + volcanesAntigua10)
                .expectStatus(200)
                .expectJSON({
                    "id": "volcanes_antigua_fan_1",
                    "package": 3,
                    "desc": {
                        "en": "",
                        "de": "Schon zehn Vulkanausbr�che und der Volcanes Antigua schmeckt genau so aufregend wie beim ersten Schluck. Das nennen wir Temperament."
                    },
                    "name": {
                        "en": "Volcanes Antigua Fan",
                        "de": "Volcanes Antigua Fan"
                    },
                    "icon": {
                        "en": "http://fakeimg.pl/250x250",
                        "de": "http://fakeimg.pl/250x250"
                    },
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

            frisby.create('Getting ' + volcanesAntigua30 + ' achievement')
                .get(url + userID + '/achievements/' + volcanesAntigua30)
                .expectStatus(200)
                .expectJSON({
                    "id": "volcanes_antigua_fan_2",
                    "package": 3,
                    "desc": {
                        "en": "Congratulations, you just survived your 30th volcanic eruption. Despite that the arabica, grown on lava grounds, is still full of spirit. Hopefully your creativity as well.",
                        "de": "Gl�ckwunsch, du hast jetzt schon 30 Vulkanausbr�che ausgel�st. Und der Arabica, gewachsen auf Lavab�den, spr�ht immer noch vor Temperament. Deine Kreativit�t sicher auch."
                    },
                    "name": {
                        "en": "Volcanes Antigua Fan",
                        "de": "Volcanes Antigua Fan"
                    },
                    "icon": {
                        "en": "http://fakeimg.pl/250x250",
                        "de": "http://fakeimg.pl/250x250"
                    },
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


            frisby.create('Getting ' + volcanesAntigua70 + ' achievement')
                .get(url + userID + '/achievements/' + volcanesAntigua70)
                .expectStatus(200)
                .expectJSON({
                    "id": "volcanes_antigua_fan_3",
                    "package": 3,
                    "desc": {
                        "en": "",
                        "de": "Tanzt du auf dem Vulkan? Du hast jetzt 70 Volcanes Antigua gebr�ht � dieser Kaffee  scheint deine Kreativit�t ja richtig anzufeuern."
                    },
                    "name": {
                        "en": "Volcanes Antigua Fan",
                        "de": "Volcanes Antigua Fan"
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

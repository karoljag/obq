var frisby = require('frisby');
var jasmine = require('jasmine');
var url = process.env.url;

var cafezinhoIpanema1 = "cafezinho_ipanema_tester";
var cafezinhoIpanema10 = "cafezinho_ipanema_fan_1";
var cafezinhoIpanema30 = "cafezinho_ipanema_fan_2";
var cafezinhoIpanema70 = "cafezinho_ipanema_fan_3";

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


    it("cafezinho Ipanema tests", function() {

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
            frisby.create('POST event for getting Cafezinho Ipanema')
                .post(url + userID + '/events', {
                    "body": {
                        "tm": 3641671232,
                        "name": "brew",
                        "machineId": "uuid",
                        "version": "v1_2",
                        "capsuleId": "671",
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

            frisby.create('Getting ' + cafezinhoIpanema1 + ' achievement')
                .get(url + userID + '/achievements/' + cafezinhoIpanema1)
                .expectStatus(200)
                .expectJSON({
                    "id": "cafezinho_ipanema_tester",
                    "package": 11,
                    "desc": {
                        "en": "This malty-sweet note of Cafezinho Ipanema for sure comes directly from the sugarloaf. People there love their Cafezihno at mean brasilian espresso. This coffee tastes like so much lust for life, that work doesn't even feel like work anymore.",
                        "de": "Die feine malzig-s��e Note des Cafezinho Ipanema kommt vielleicht sogar direkt vom Zuckerhut?  Dort lieben die Menschen ihren Cafezinho! Der schmeckt nach viel Lebensfreude, und erinnert an die Abendstunden am Brasilianischen Strand. "
                    },
                    "name": {
                        "en": "Cafezinho Ipanema Tester",
                        "de": "Cafezinho Ipanema Tester"
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

            frisby.create('Getting ' + cafezinhoIpanema10 + ' achievement')
                .get(url + userID + '/achievements/' + cafezinhoIpanema10)
                .expectStatus(200)
                .expectJSON({
                    "id": "cafezinho_ipanema_fan_1",
                    "package": 11,
                    "desc": {
                        "en": "",
                        "de": "Und soooo inspirierend. Nach nur zehn Cafezinho Ipanema wei�t du ja bereits, dass dich schon mit dem ersten Schluck brasilianische Lebensfreude packt. Mach dich auf zum Strand! "
                    },
                    "name": {
                        "en": "Cafezinho Ipanema Fan",
                        "de": "Cafezinho Ipanema Fan"
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

            frisby.create('Getting ' + cafezinhoIpanema30 + ' achievement')
                .get(url + userID + '/achievements/' + cafezinhoIpanema30)
                .expectStatus(200)
                .expectJSON({
                    "id": "cafezinho_ipanema_fan_2",
                    "package": 11,
                    "desc": {
                        "en": "",
                        "de": "Fast schade, dass der Espresso vom Zuckerhut nicht gr��er ist. Umso erstaunlicher, dass dir selbst der kleinste Schluck Cafezino Ipanema jeden Tag ein St�ck vers��t."
                    },
                    "name": {
                        "en": "Cafezinho Ipanema Fan",
                        "de": "Cafezinho Ipanema Fan"
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


            frisby.create('Getting ' + cafezinhoIpanema70 + ' achievement')
                .get(url + userID + '/achievements/' + cafezinhoIpanema70)
                .expectStatus(200)
                .expectJSON({
                    "id": "cafezinho_ipanema_fan_3",
                    "package": 11,
                    "desc": {
                        "en": "",
                        "de": "Nach 70 Cafezinho Ipanema bist du ja schon ein Experte f�r brasilianisches Temperament in kleinen Tassen. Ob du automatisch auch schon ein bisschen portugiesisch sprichst?"
                    },
                    "name": {
                        "en": "Cafezinho Ipanema Fan",
                        "de": "Cafezinho Ipanema Fan"
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

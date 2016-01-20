var frisby = require('frisby');
var jasmine = require('jasmine');
var url = process.env.url;

var jebenaYirgai1 = "jebena_yirga_tester";
var jebenaYirgai10 = "jebena_yirga_fan_1";
var jebenaYirgai30 = "jebena_yirga_fan_2";
var jebenaYirga70 = "jebena_yirga_fan_3";

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

            wait(1000);
            var coffee = 0
            while (coffee < 70) {

                //Sending event
            frisby.create('POST event for getting Jebena Yirga  ')
                .post(url + userID + '/events', {
                    "body": {
                        "tm": 3641671232,
                        "name": "brew",
                        "machineId": "uuid",
                        "version": "v1_2",
                        "capsuleId": "325",
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

            frisby.create('Getting ' + jebenaYirgai1 + ' achievement')
                .get(url + userID + '/achievements/' + jebenaYirgai1)
                .expectStatus(200)
                .expectJSON({
                    "id": "jebena_yirga_tester",
                    "package": 4,
                    "desc": {
                        "en": "In Ethiopia coffee is being cooked in so called Jebenas. You are cooking your Jebena Yirga in so called Qbo-machines. The result is the same: arabica, that shows you the direct way to completely new ideas.",
                        "de": "In �thiopien kocht man Kaffee in sogenannten Jebenas. Bei uns kocht man den Jebena Yirga in sogenannten Qbo-Maschinen. Das Ergebnis ist dasselbe: 100% �thiopischer Arabica, der dich auf k�rzestem Wege auf ganz neue Gedanken bringt."
                    },
                    "name": {
                        "en": "Jebena Yirga Tester",
                        "de": "Jebena Yirga Tester"
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

            frisby.create('Getting ' + jebenaYirgai10 + ' achievement')
                .get(url + userID + '/achievements/' + jebenaYirgai10)
                .expectStatus(200)
                .expectJSON({
                    "id": "jebena_yirga_fan_1",
                    "package": 4,
                    "desc": {
                        "en": "",
                        "de": "Jetzt hast du schon zehn Jebena Yirgas gebr�ht! Die Sorte haben wir nach der �thiopischen Tradition benannt, Kaffee in t�nernen Jebenas zu kochen. Ob man in �thiopien auch Sorten nach der Tradition benennt, Kaffee in Qbo-Maschinen zu kochen?"
                    },
                    "name": {
                        "en": "Jebena Yirga Fan",
                        "de": "Jebena Yirga Fan"
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


            frisby.create('Getting ' + jebenaYirgai30 + ' achievement')
                .get(url + userID + '/achievements/' + jebenaYirgai30)
                .expectStatus(200)
                .expectJSON({
                    "id": "jebena_yirga_fan_2",
                    "package": 4,
                    "desc": {
                        "en": "",
                        "de": "30 Jebena Yirgas! Unsere Jebena Karaffe ist die YOU-RISTA � und ihr scheint blendend miteinander auszukommen. Deine eigene �thiopische Kaffeezeremonie zu Hause hast du ja schon voll im Griff! "
                    },
                    "name": {
                        "en": "Jebena Yirga Fan",
                        "de": "Jebena Yirga Fan"
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


            frisby.create('Getting ' + jebenaYirga70 + ' achievement')
                .get(url + userID + '/achievements/' + jebenaYirga70)
                .expectStatus(200)
                .expectJSON({
                    "id": "jebena_yirga_fan_3",
                    "package": 4,
                    "desc": {
                        "en": "",
                        "de": "Die Jebena Karaffen sind zwar toll, aber ihnen fehlt der Br�hknopf? Die L�sung dazu hast du schon l�ngst gefunden: Jebena Yirga Kapsel nehmen, in die YOU-RISTA rein, und deine kleine Zeremonie einfach zu Hause genie�en. Heute hast du genau das sogar schon zum 70. Mal gemacht! "
                    },
                    "name": {
                        "en": "Jebena Yirga Fan",
                        "de": "Jebena Yirga Fan"
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

var frisby = require('frisby');
var jasmine = require('jasmine');
var url = process.env.url;

var babaBudan_amount1 = "baba_budan_tester";
var babaBudan_amount10 = "baba_budan_fan_1";
var babaBudan_amount30 = "baba_budan_fan_2";
var babaBudan_amount70 = "baba_budan_fan_3";

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


    it("baba budan tests", function() {

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

            while (coffee < 500) {


                //Sending event
            frisby.create('POST event for getting Baba Budan  ')
                .post(url + userID + '/events', {
                    "body": {
                        "tm": 3641671232,
                        "name": "brew",
                        "machineId": "uuid",
                        "version": "v1_2",
                        "capsuleId": "260",
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



            frisby.create('Getting ' + babaBudan_amount1 + ' achievement')
                .get(url + userID + '/achievements/' + babaBudan_amount1)
                .expectStatus(200)
                .expectJSON({
                    "category": "frequency",
                    "id": "baba_budan_tester",
                    "package": 7,
                    "group": "brew",
                    "counter": 1,
                    "level": 1,
                    "visibility": "standard",
                    "type": "progressive",

                })
               .expectJSONTypes({
                    "name": Object,
                    "desc": Object,
                    "icon": Object,
                    "earnedAt": String
                })
                .toss();

            frisby.create('Getting ' + babaBudan_amount10 + ' achievement')
                .get(url + userID + '/achievements/' + babaBudan_amount10)
                .expectStatus(200)
                .expectJSON({
                    "id": "baba_budan_fan_1",
                    "package": 7,
                    "desc": {
                        "en": "",
                        "de": "So langsam bist du per \"du\" mit unserem staken Baba Budan. Sch�n, wenn dir  dieser Robusta inspirierte Kaffee so gut schmeckt, denn er bleibt gerne l�nger ein starker Freund an deiner Seite!"
                    },
                    "name": {
                        "en": "Baba Budan Fan",
                        "de": "Baba Budan Fan"
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

            frisby.create('Getting ' + babaBudan_amount30 + ' achievement')
                .get(url + userID + '/achievements/' + babaBudan_amount30)
                .expectStatus(200)
                .expectJSON({
                    "id": "baba_budan_fan_2",
                    "package": 7,
                    "desc": {
                        "en": "30x Baba Budan! If the strong Indian was on Facebook you already would be friends. Once upon a time he smuggled seven coffee beans to India and founded the indian coffee tradition. Thanks to 40% robusta he is supporting you during your morning shifts.",
                        "de": "Seit 30 Tassen gehst du mit unserem kr�ftigen Baba Budan durch Dick und D�nn. Ihr seid ein richtiges Dream Team, das starken Kaffee und starke Freundschaften liebt. So leicht kommt nichts zwischen euch!"
                    },
                    "name": {
                        "en": "Baba Budan Fan",
                        "de": "Baba Budan Fan"
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


            frisby.create('Getting' + babaBudan_amount70 + 'achievement')
                .get(url + userID + '/achievements/' + babaBudan_amount70)
                .expectStatus(200)
                .expectJSON({
                    "id": "baba_budan_fan_3",
                    "package": 7,
                    "desc": {
                        "en": "",
                        "de": "70 Mal Baba Budan! Ihr seid schon l�ngst �ber eine einfache Facebook Freundschaft hinaus. Dank dem 40% besten indischen Robusta Anteil, ist Baba Budan besonders stark und gro� geworden!  Einst nutzte er seine Kraft um die ersten sieben Kaffeebohnen nach Indien zu bringen � heute ist er ganz f�r dich da!"
                    },
                    "name": {
                        "en": "Baba Budan Fan",
                        "de": "Baba Budan Fan"
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

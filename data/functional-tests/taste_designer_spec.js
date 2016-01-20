var frisby = require('frisby');
var jasmine = require('jasmine');
var url = process.env.url;

var crRec1 = "taste_rookie";
var crRec5 = "taste_designer_1";
var crRec10 = "taste_designer_2";
var crRec15 = "taste_designer_3";

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


describe("User achievements suite", function() {


    it("QBO first tests", function() {

        frisby.create('Getting tag')
            .get(url + '/tags/qbo')
            .expectStatus(200)
            .toss();

        frisby.create('Getting tag')
            .get(url + '/tags/badgesWithProgress')
            .expectStatus(200)
            .toss();

        wait(1000);


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
                var uux = userID.substr(7)

                wait(1000);


                var taste = 0
                for (taste = 0; taste < 15; taste++) {

                    //Sending event
                    frisby.create('POST event for getting Taste rookie  ')
                        .post(url + userID + '/events', {
                            "body": {
                                "tm": 3641671232,
                                "name": "brew",
                                "machineId": "uuid",
                                "version": "v1_2",
                                "capsuleId": "cof1",
                                "recipe": {
                                    "uid": "default-1",
                                    "creatorId": uux,
                                    "userId": "vvv",
                                    "userName": "Monica",
                                    "name": "My coffee  "  + userID + taste ,
                                    "coffeeAmount": 10,
                                    "foamAmount": 10,
                                    "milkAmount": 20,
                                    "cupSize": 200,
                                    "creationTimestamp": 1410767140,
                                    "defaultRecipe": 0,
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
                                    "foamAmount": 100,
                                    "milkAmount": 150
                                },
                                "favouriteCapsuleId": 866
                            }

                        }, {
                            json: true
                        })
                        .expectStatus(202)
                        .toss();


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


                frisby.create('Getting ' + crRec1 + ' achievement')
                    .get(url + userID + '/achievements/' + crRec1)
                    .expectStatus(200)
                    .expectJSON({
                        "id": "taste_rookie",
                        "package": 31,
                        "desc": {
                            "en": "",
                            "de": "Wir machen keine Wissenschaft aus Kaffeekochen. Aber eine Leidenschaft! Deshalb freuen wir uns �ber jedes Rezept, mit dem du dein Profil sch�rfst. Deine Qbo-Freunde nat�rlich auch."
                        },
                        "name": {
                            "en": "Taste Rookie",
                            "de": "Geschmacksneuling"
                        },
                        "icon": {
                            "en": "http://fakeimg.pl/250x250",
                            "de": "http://fakeimg.pl/250x250"
                        },
                        "category": "social",
                        "counter": 1,
                        "type": "progressive",
                        "visibility": "normal",
                        "group": "createRecipe",
                        "level": 1
                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting ' + crRec5 + ' achievement')
                    .get(url + userID + '/achievements/' + crRec5)
                    .expectStatus(200)
                    .expectJSON({
                        "id": "taste_designer_1",
                        "package": 31,
                        "desc": {
                            "en": "",
                            "de": "Man nehme f�nf selbst kreierte Kaffee-Rezepte, schicke sie an seine Qbo-Maschine und genie�e. Gl�ckwunsch, du bist jetzt ein echter Taste Designer!"
                        },
                        "name": {
                            "en": "Taste Designer",
                            "de": "Geschmacks Designer"
                        },
                        "icon": {
                            "en": "http://fakeimg.pl/250x250",
                            "de": "http://fakeimg.pl/250x250"
                        },
                        "category": "social",
                        "counter": 5,
                        "type": "progressive",
                        "visibility": "normal",
                        "group": "createRecipe",
                        "level": 1
                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting ' + crRec10 + ' achievement')
                    .get(url + userID + '/achievements/' + crRec10)
                    .expectStatus(200)
                    .expectJSON({
                        "id": "taste_designer_2",
                        "package": 31,
                        "desc": {
                            "en": "",
                            "de": "K�nnte es sein, dass Qbo einen richtigen Kaffee-Gourmet in dir geweckt hat? Kein Wunder, Wecken ist ja irgendwie auch unser Gesch�ft."
                        },
                        "name": {
                            "en": "Taste Designer",
                            "de": "Geschmacks Designer"
                        },
                        "icon": {
                            "en": "http://fakeimg.pl/250x250",
                            "de": "http://fakeimg.pl/250x250"
                        },
                        "category": "social",
                        "counter": 10,
                        "type": "progressive",
                        "visibility": "normal",
                        "group": "createRecipe",
                        "level": 1
                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting ' + crRec15 + ' achievement')
                    .get(url + userID + '/achievements/' + crRec15)
                    .expectStatus(200)
                    .expectJSON({
                        "id": "taste_designer_3",
                        "package": 31,
                        "desc": {
                            "en": "",
                            "de": "Neue Rezeptideen gehen dir wohl nie aus! Wenn du so weiter machst, kommen wir bald mal auf einen Kaffee mit hoch."
                        },
                        "name": {
                            "en": "Taste Designer",
                            "de": "Geschmacks Designer"
                        },
                        "icon": {
                            "en": "http://fakeimg.pl/250x250",
                            "de": "http://fakeimg.pl/250x250"
                        },
                        "category": "social",
                        "counter": 15,
                        "type": "progressive",
                        "visibility": "normal",
                        "group": "createRecipe",
                        "level": 1
                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();


                frisby.create('Deleting' + userID)
                    .delete(url + userID)
                    .expectStatus(204)
                    .toss();

            })
            .toss();

    })


});

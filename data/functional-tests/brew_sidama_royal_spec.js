var frisby = require('frisby');
var jasmine = require('jasmine');
var url = process.env.url;

var sidamaRoyal_amount1 = "sidama_royal_tester";
var sidamaRoyal_amount10 = "sidama_royal_fan_1";
var sidamaRoyal_amount30 = "sidama_royal_fan_2";
var sidamaRoyal_amount70 = "sidama_royal_fan_3";

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

    it("sidama Royal tests", function() {

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
            frisby.create('POST event for getting Sidama Royal')
                .post(url + userID + '/events', {
                    "body": {
                        "tm": 3641671232,
                        "name": "brew",
                        "machineId": "uuid",
                        "version": "v1_2",
                        "capsuleId": "736",
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
                wait(2000);

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

                frisby.create('Getting ' + sidamaRoyal_amount1 + ' achievement')
                    .get(url + userID + '/achievements/' + sidamaRoyal_amount1)
                    .expectStatus(200)
                    .expectJSON({
                        "id": "sidama_royal_tester",
                        "package": 9,
                        "desc": {
                            "en": "You probably just now attended you first royal wedding. For our Sidama Royal we hitched espresso beans from the best cultivating areas of Ethopia and Southern America. This marriage tastes almost too good to be true.",
                            "de": "Du hast gerade wahrscheinlich deine erste k�nigliche Hochzeit besucht! Denn f�r unseren Sidama Royal haben wir Espressobohnen aus den besten Anbaugebieten �thiopiens und S�damerikas verheiratet. Definitiv keine Trennung in Sicht! "
                        },
                        "name": {
                            "en": "Sidama Royal Tester",
                            "de": "Sidama Royal Tester"
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

                frisby.create('Getting ' + sidamaRoyal_amount10 + ' achievement')
                    .get(url + userID + '/achievements/' + sidamaRoyal_amount10)
                    .expectStatus(200)
                    .expectJSON({
                        "id": "sidama_royal_fan_1",
                        "package": 9,
                        "desc": {
                            "en": "",
                            "de": "Du glaubst an die Ehe? Jedenfalls an die zwischen Espressobohnen aus den besten Anbaugebieten �thiopiens und S�damerikas. Immerhin hast du schon zehn Mal Ja zu unserem Sidama Royal gesagt."
                        },
                        "name": {
                            "en": "Sidama Royal Fan",
                            "de": "Sidama Royal Fan"
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

                frisby.create('Getting ' + sidamaRoyal_amount30 + ' achievement')
                    .get(url + userID + '/achievements/' + sidamaRoyal_amount30)
                    .expectStatus(200)
                    .expectJSON({
                        "id": "sidama_royal_fan_2",
                        "package": 9,
                        "desc": {
                            "en": "",
                            "de": "F�r den Sidama Royal haben wir Espressobohnen aus den besten Anbaugebieten �thiopiens und S�damerikas verkuppelt. Das Ergebnis schmeckt k�niglich. Aber wem sagen wir das? Du hast ja bereits 30 Tassen getrunken."
                        },
                        "name": {
                            "en": "Sidama Royal Fan",
                            "de": "Sidama Royal Fan"
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


                frisby.create('Getting ' + sidamaRoyal_amount70 + ' achievement')
                    .get(url + userID + '/achievements/' + sidamaRoyal_amount70)
                    .expectStatus(200)
                    .expectJSON({
                        "id": "sidama_royal_fan_3",
                        "package": 9,
                        "desc": {
                            "en": "",
                            "de": "Wahnsinn, du hast jetzt schon auf 70 k�niglichen Hochzeiten getanzt. Das schafft nicht mal die Queen. Selber Schuld, wenn man lieber Tee trinkt als unseren k�stlichen Sidama Royal."
                        },
                        "name": {
                            "en": "Sidama Royal Fan",
                            "de": "Sidama Royal Fan"
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

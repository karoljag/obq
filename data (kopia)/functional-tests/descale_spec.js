var frisby = require('frisby');
var jasmine = require('jasmine');
var url = process.env.url;

var dT320 = "descale_champion_1";
var dT640 = "descale_champion_2";
var dT960 = "descale_champion_3";


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


function MaintenanceUpdateDescale(uid) {

    frisby.create('POST event for maintenanceUpdate x1  ')
        .post(url + uid + '/events', {
            "body": {
                "tm": 3641671257,
                "name": "maintenanceUpdate",
                "machineId": "uuid",
                "version": "v1_2",
                "maintenanceInformation": {
                    "maximumDescaleValue": 40000,
                    "currentDescaleValue": 300,
                    "machineDescaleStatus": 1,
                    "maximumCleanValue": 15,
                    "currentCleanValue": 3,
                    "machineCleanStatus": 0,
                    "rinsingStatus": 2,
                    "milkElementAttached": 0
                }
            }
        }, {
            json: true
        })
        .expectStatus(202)
        .toss();
}


function Descale(uid) {
    frisby.create('POST event for descale ')
        .post(url + uid + '/events', {
            "body": {
                "tm": 3641671256,
                "name": "descale",
                "machineId": "uuid",
                "userId": "uuid",
                "version": "v1_2"
            }
        }, {
            json: true
        })
        .expectStatus(202)
        .toss();
}



describe("User achievements suite", function() {


    it("QBO descale tests", function() {

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
                var uid = userID


                MaintenanceUpdateDescale(uid);
                Descale(uid);

                MaintenanceUpdateDescale(uid);
                Descale(uid);

                MaintenanceUpdateDescale(uid);
                Descale(uid);

                wait(5000);

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


                frisby.create('Getting ' + dT320 + ' achievements')
                    .get(url + userID + '/achievements/' + dT320)
                    .expectStatus(200)
                    .expectJSON({
                        "id": "descale_champion_1",
                        "package": 1,
                        "desc": {
                            "en": "descale a Qbo (after 320 capsules)"
                        },
                        "name": {
                            "en": "Descale Champion",
                            "de": "Kalk Schreckr"
                        },
                        "icon": {
                            "en": "http://fakeimg.pl/250x250",
                            "de": "http://fakeimg.pl/250x250"
                        },
                        "category": "main",
                        "counter": 320,
                        "type": "progressive",
                        "visibility": "surprise",
                        "group": "usage",
                        "level": 1
                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object,
                        "earnedAt": String
                    })
                    .toss();

                frisby.create('Getting ' + dT640 + ' achievements')
                    .get(url + userID + '/achievements/' + dT640)
                    .expectStatus(200)
                    .expectJSON({
                        "id": "descale_champion_2",
                        "package": 1,
                        "desc": {
                            "en": "descale a Qbo (after 640 capsules)"
                        },
                        "name": {
                            "en": "Descale Champion 2",
                            "de": "Kalk Schreckr 2"
                        },
                        "icon": {
                            "en": "http://fakeimg.pl/250x250",
                            "de": "http://fakeimg.pl/250x250"
                        },
                        "category": "main",
                        "counter": 640,
                        "type": "progressive",
                        "visibility": "surprise",
                        "group": "usage",
                        "level": 1
                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object,
                        "earnedAt": String
                    })
                    .toss();

                frisby.create('Getting ' + dT960 + ' achievements')
                    .get(url + userID + '/achievements/' + dT960)
                    .expectStatus(200)
                    .expectJSON({
                        "id": "descale_champion_3",
                        "package": 1,
                        "desc": {
                            "en": "descale a Qbo (after 960 capsules)"
                        },
                        "name": {
                            "en": "Descale Champion 3",
                            "de": "Kalk Schreckr 3"
                        },
                        "icon": {
                            "en": "http://fakeimg.pl/250x250",
                            "de": "http://fakeimg.pl/250x250"
                        },
                        "category": "main",
                        "counter": 960,
                        "type": "progressive",
                        "visibility": "surprise",
                        "group": "usage",
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

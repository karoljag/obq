var frisby = require('frisby');
var jasmine = require('jasmine');
var url = process.env.url;

var mMO = "milk_master_owner";

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

    it("QBO machine owner tests", function() {

        frisby.create('Getting tag')
            .get(url + '/tags/qbo')
            .expectStatus(200)
            .toss();

        frisby.create('Getting tag')
            .get(url + '/tags/badgesWithProgress')
            .expectStatus(200)
            .toss();

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

                frisby.create('POST maintenanceUpdate event for "milk_master_owner"  ')
                    .post(url + userID + '/events', {
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
                                "rinsingStatus": 1,
                                "milkElementAttached": 0
                            }
                        }
                    }, {
                        json: true
                    })
                    .expectStatus(202)
                    .toss();

                wait(1000);

                frisby.create('Getting "welcome" achievement')
                    .get(url + userID + '/achievements/welcome')
                    .expectStatus(200)
                    .expectJSON({
                        "category": "other",
                        "package": 17,
                        "counter": 1,
                        "level": 1,
                        "visibility": "standard",
                        "type": "onetime",
                        "id": "welcome"

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object,

                    })
                    .toss();

                frisby.create('Getting' + mMO + 'achievement')
                    .get(url + userID + '/achievements/' + mMO)
                    .expectStatus(200)
                    .expectJSON({
                        "id": "milk_master_owner",
                        "package": 20,
                        "desc": {
                            "en": "Connect milk module to machine first time",
                            "de": "Qbo-Kaffee ist k�stlich. Aber mal ehrlich: Selbst der beste Kaffee bringt es ohne Milch nicht zum Caf� au Lait. Dank Milk Master er�ffnest du deinen Kapseln jetzt alle M�glichkeiten zur freien Entfaltung � trotzdem bleibt schwarz nat�rlich streng erlaubt."
                        },
                        "name": {
                            "en": "Milk Master Owner",
                            "de": "Milk Master-Besitzer"
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
                        "icon": Object
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

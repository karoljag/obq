var frisby = require('frisby');
var jasmine = require('jasmine');
var url = process.env.url;

var mO = "machine_owner";

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

        wait(1000);

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

            //Sending event
            frisby.create('POST event for getting Machine Owner  ')
                .post(url + userID + '/events', {
                    "body": {
                        "machineId": "99E121F7-3BF0-4C33-AE91-C2DB4BFA8D29",
                        "name": "wifiSetup",
                        "sentToLoyaltyWithAccountId": "614f11f8-b043-433b-8e8d-e6157015e59b",
                        "version": "V01.05.E001",
                        "timestamp": 1450359098
                    }
                }, {
                    json: true
                })
                .expectStatus(202)
                .after(function(err, res, body) {

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

                    frisby.create('Getting ' + mO + ' achievement')
                        .get(url + userID + '/achievements/' + mO)
                        .expectStatus(200)
                        .expectJSON({
                            "category": "other",
                            "package": 19,
                            "counter": 1,
                            "level": 1,
                            "visibility": "standard",
                            "type": "onetime",
                            "id": "machine_owner",

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

        .toss();

    });

});

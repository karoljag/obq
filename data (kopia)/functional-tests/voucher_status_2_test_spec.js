var frisby = require('frisby');
var jasmine = require('jasmine');
var randomString = require('random-string');
var url = process.env.url;

var delayTime = process.env.pause || 2000;

beforeEach(function(done) {
    setTimeout(function() {
        done();
    }, delayTime);
});


describe("Voucher's status test suite", function() {

    it("QBO voucher's tests", function() {

        frisby.create('Getting tag')
            .get(url + '/tags/qbo')
            .expectStatus(200)
            .toss();

        frisby.create('Getting tag')
            .get(url + '/tags/badgesWithProgress')
            .expectStatus(200)
            .toss();
        var userID = 'user_' + randomString({
            length: 20
        });


        var voID = 'voucher_' + randomString({
            length: 20
        });

        //Create a voucher with a specified id.
        frisby.create('Put to create a voucher ')
            .put(url + '/vouchers/' + voID, {
                "name": "1",
                "about": "Voucher 1"

            }, {
                json: true
            })
            .expectStatus(201)
            .expectHeaderContains('Content-Type', 'application/json')
            .toss();

        frisby.create('Update a voucher')
            .put(url + '/vouchers/' + voID, {
                "id": voID,
                "name": "updated name",
                "description": "updated description",
                "about": "Voucher 1"

            }, {
                json: true
            })
            .expectStatus(200)
            .expectHeaderContains('Content-Type', 'application/json')
            .toss();

        frisby.create('Get a voucher to check if voucher is updated')
            .get(url + '/vouchers/' + voID)
            .expectJSON({
                "id": voID,
                "name": "updated name",
                "description": "updated description",
                "about": "Voucher 1"
            })
            .expectStatus(200)
            .expectHeaderContains('Content-Type', 'application/json')
            .toss();

        frisby.create('Add new codes to a voucher')
            .post(url + '/vouchers/' + voID + '/codes', [{
                "id": "testCode",
                "status": "active"
            }], {
                json: true
            })
            .expectStatus(200)
            .expectHeaderContains('Content-Type', 'application/json')
            .toss();

        frisby.create('Allowed change code')
            .put(url + '/vouchers/' + voID + '/codes/testCode', {
                "id": "testCode",
                "status": "active",
                "allowed": "Allowed change X1"
            }, {
                json: true
            })
            .expectJSON({
                "id": "testCode",
                "status": "active",
                "allowed": "Allowed change X1"
            })
            .expectStatus(200)
            .expectHeaderContains('Content-Type', 'application/json')
            .toss();


        frisby.create('Disable a code')
            .put(url + '/vouchers/' + voID + '/codes/testCode/status/disabled', {}, {
                json: true
            })
            .expectStatus(200)
            .expectHeaderContains('Content-Type', 'application/json')
            .toss();

        frisby.create('Allowed change code')
            .put(url + '/vouchers/' + voID + '/codes/testCode', {
                "id": "testCode",
                "status": "disabled",
                "allowed": "Allowed change X2"
            }, {
                json: true
            })
            .expectJSON({
                "id": "testCode",
                "status": "disabled",
                "allowed": "Allowed change X2"
            })
            .expectStatus(200)
            .expectHeaderContains('Content-Type', 'application/json')
            .toss();


        frisby.create('Get a code to check status "disabled"')
            .get(url + '/vouchers/' + voID + '/codes/testCode')
            .expectJSON({
                "id": "testCode",
                "status": "disabled",
                "allowed": "Allowed change X2"

            })
            .expectStatus(200)
            .expectHeaderContains('Content-Type', 'application/json')
            .toss();

        frisby.create('Reactivate a code')
            .put(url + '/vouchers/' + voID + '/codes/testCode/status/active', {}, {
                json: true
            })
            .expectStatus(200)
            .expectHeaderContains('Content-Type', 'application/json')
            .toss();


        frisby.create('Allowed change code')
            .put(url + '/vouchers/' + voID + '/codes/testCode', {
                "id": "testCode",
                "status": "disabled",
                "allowed": "Allowed change X3"
            }, {
                json: true
            })
            .expectJSON({
                "id": "testCode",
                "status": "active",
                "allowed": "Allowed change X3"
            })
            .expectStatus(200)
            .expectHeaderContains('Content-Type', 'application/json')
            .toss();

        frisby.create('Get a code to check status "active"')
            .get(url + '/vouchers/' + voID + '/codes/testCode')
            .expectJSON({
                "id": "testCode",
                "status": "active",
                "allowed": "Allowed change X3"

            })
            .expectStatus(200)
            .expectHeaderContains('Content-Type', 'application/json')
            .toss();

        frisby.create('Disable a code')
            .put(url + '/vouchers/' + voID + '/codes/testCode/status/disabled', {}, {
                json: true
            })
            .expectStatus(200)
            .expectHeaderContains('Content-Type', 'application/json')
            .toss();


    });

});

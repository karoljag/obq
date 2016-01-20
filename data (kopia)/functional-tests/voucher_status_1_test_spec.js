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


describe("Voucher's test suite", function() {

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


        //Create user
        frisby.create('PUT one user')
            .put(url + '/users/' + userID, {
                "firstName": "UserQBO",
                "confirmationState": "CONFIRMED",
                "email": "hosun.lee@bornholdtlee.de",
                "tags": ["qbo", "badgesWithProgress"]
            }, {
                json: true
            })
            .expectStatus(201)
            .expectHeaderContains('Content-Type', 'application/json')
            .toss();




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
                "id": "1",
                "status": "active",
                "desc": "one"
            }, {
                "id": "2",
                "status": "active",
                "desc": "two"
            }], {
                json: true
            })
            .expectStatus(200)
            .expectHeaderContains('Content-Type', 'application/json')
            .toss();


        frisby.create('Allowed change before assigning ')
            .put(url + '/vouchers/' + voID + '/codes/1', {
                "id": "1",
                "status": "active",
                "desc": "one",
                "allowed": 'Allowed change before assigning'
            }, {
                json: true
            })
            .expectJSON({
                "id": "1",
                "status": "active",
                "desc": "one",
                "allowed": 'Allowed change before assigning'
            })
            .expectStatus(200)
            .expectHeaderContains('Content-Type', 'application/json')
            .toss();


        frisby.create('Add a voucher code to a user')
            .put(url + '/users/' + userID + '/vouchers/' + voID, {}, {
                json: true
            })
            .expectStatus(202)
            .expectHeaderContains('Content-Type', 'application/json')
            .toss();

        frisby.create('Add a voucher code to a user')
            .put(url + '/users/' + userID + '/vouchers/' + voID, {}, {
                json: true
            })
            .expectStatus(202)
            .expectHeaderContains('Content-Type', 'application/json')
            .toss();


        frisby.create('Not allowed change after assigning')
            .put(url + '/vouchers/' + voID + '/codes/1', {
                "id": "1",
                "status": "assigned",
                "desc": "one",
                "allowed": 'NOT allowed change after assigning'
            }, {
                json: true
            })
            .expectJSON({
                "code": 40002,
                "message": 'Validation error',
                "data": 'You are not allowed to edit code that was assigned'
            })
            .expectStatus(400)
            .expectHeaderContains('Content-Type', 'application/json')
            .toss();



        frisby.create('Get a code to check status "assigned"')
            .get(url + '/vouchers/' + voID + '/codes/1')
            .expectJSON({
                "id": "1",
                "status": "assigned",
                "desc": "one",
                "allowed": 'Allowed change before assigning'
            })
            .expectStatus(200)
            .expectHeaderContains('Content-Type', 'application/json')
            .toss();


        frisby.create('Get a code to check status "assigned"')
            .get(url + '/vouchers/' + voID + '/codes/2')
            .expectJSON({
                "id": "2",
                "status": "assigned",
                "ownerId": userID,
                "desc": "two"
            })
            .expectStatus(200)
            .expectHeaderContains('Content-Type', 'application/json')
            .toss();

        frisby.create('Redeem a code')
            .put(url + '/vouchers/' + voID + '/codes/2/status/redeemed', {

            }, {
                json: true
            })
            .expectStatus(200)
            .expectHeaderContains('Content-Type', 'application/json')
            .toss();


        frisby.create('Not allowed change after redeemed')
            .put(url + '/vouchers/' + voID + '/codes/2', {
                "id": "2",
                "status": "assigned",
                "desc": "one",
                "allowed": "Not allowed change after redeemed"
            }, {
                json: true
            })
            .expectJSON({
                "code": 40002,
                "message": 'Validation error',
                "data": 'You are not allowed to edit code that was assigned'
            })
            .expectStatus(400)
            .expectHeaderContains('Content-Type', 'application/json')
            .toss();


        frisby.create('Get a code to check status "redeemed"')
            .get(url + '/vouchers/' + voID + '/codes/2')
            .expectJSON({
                "id": "2",
                "status": "redeemed",
                "voucherId": voID,
                "ownerId": userID,
                "desc": "two",
                "name": "updated name",
                "description": "updated description",
                "about": "Voucher 1"

            })
            .expectStatus(200)
            .expectHeaderContains('Content-Type', 'application/json')
            .toss();


        frisby.create('Disable a code')
            .put(url + '/vouchers/' + voID + '/codes/1/status/disabled', {}, {
                json: true
            })
            .expectStatus(200)
            .expectHeaderContains('Content-Type', 'application/json')
            .toss();


        // frisby.create('Not allowed change after disabled')
        //     .put(url + '/vouchers/' + voID + '/codes/1', {
        //         "id": "1",
        //         "status": "disabled",
        //         "desc": "two",
        //         "allowed": "Not allowed change after disabled"
        //     }, {
        //         json: true
        //     })
        //     .expectJSON({
        //         "code": 40002,
        //         "message": 'Validation error',
        //         "data": 'You are not allowed to edit code that was assigned'
        //     })
        //     .expectStatus(400)
        //     .expectHeaderContains('Content-Type', 'application/json')
        //     .toss();


        // frisby.create('Get a code to check status "disabled"')
        //     .get(url + '/vouchers/' + voID + '/codes/1')
        //     .expectJSON({
        //         "id": "1",
        //         "status": "disabled",
        //         "voucherId": voID,
        //         "ownerId": userID,
        //         "name": "updated name",
        //         "description": "updated description",
        //         "about": "Voucher 1",
        //         "desc": "one"
        //     })
        //     .expectStatus(200)
        //     .expectHeaderContains('Content-Type', 'application/json')
        //     .toss();



        // frisby.create('Deleting user ' + userID)
        //     .delete(url + '/users/' + userID)
        //     .expectStatus(204)
        //     .toss();

    });

});

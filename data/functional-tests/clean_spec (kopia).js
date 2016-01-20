var frisby = require('frisby');
var jasmine = require('jasmine');
var url = process.env.url;

var cC1 = "cleaning_star_1";
var cC2 = "cleaning_star_2";
var cC3 = "cleaning_star_3";

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

function MaintenanceUpdate(mu, uid) {
    var clean = 0

    while (clean < mu) {

        //Sending event
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
                        "machineDescaleStatus": 0,
                        "maximumCleanValue": 15,
                        "currentCleanValue": 3,
                        "machineCleanStatus": 1,
                        "rinsingStatus": 0,
                        "milkElementAttached": 0
                    }
                }
            }, {
                json: true
            })
            .expectStatus(202)
            .toss();

        clean = clean + 1
       
    }


}

function Clean(uid) {
    //Sending event
    frisby.create('POST event for event clean x1  ')
        .post(url + uid + '/events', {
            "body": {
                "tm": 3641671232,
                "name": "clean",
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


    it("QBO cleant tests", function() {

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


        .after(function(err, res, body) {
            var userID = res.headers.location;
            var uid = userID;
            

            //*************  Cleaning_Star_1  ********************  counter "successClean" = 10               
                MaintenanceUpdate(1, userID)
                Clean(uid)          


            //*************  Cleaning_Star_2  ********************  counter "successClean" = 15           
                MaintenanceUpdate(19, userID)
                Clean(uid)
           

            //*************  Cleaning_Star_3  ********************  counter "successClean" = 20             
                MaintenanceUpdate(10, userID)
                Clean(uid)
        

            wait(4000)

            frisby.create('Getting ' + cC1 + ' achievements')
                .get(url + userID + '/achievements/' + cC1)
                .expectStatus(200)
                .expectJSON({
                    "id": cC1,
                    "package": 1,
                    "desc": {
                        "en": "Cleann a Qbo (after 50 brews)",
                        "de": "Deine Maschine ist jetzt wieder blitzeblank und bereit f�r deine neuesten Kaffeespezialit�ten. Oder f�r die alt bew�hrten. Denn dank regelm��iger Reinigung schmecken die immer wieder lecker."
                    },
                    "name": {
                        "en": "Cleaning Star",
                        "de": "Putzaktivist "
                    },
                    "icon": {
                        "en": "http://fakeimg.pl/250x250",
                        "de": "http://fakeimg.pl/250x250"
                    },
                    "category": "main",
                    "counter": 50,
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

            frisby.create('Getting ' + cC2 + ' achievements')
                .get(url + userID + '/achievements/' + cC2)
                .expectStatus(200)
                .expectJSON({
                    "id": cC2,
                    "package": 1,
                    "desc": {
                        "en": "Cleann a Qbo (after 100 brews)",
                        "de": "Jetzt hast du deine Maschine schon wieder richtig fleissig gereinigt. Sie wird es dir danken. Mit richtig leckerem Kaffee."
                    },
                    "name": {
                        "en": "Cleaning Star 2",
                        "de": "Putzaktivist 2"
                    },
                    "icon": {
                        "en": "http://fakeimg.pl/250x250",
                        "de": "http://fakeimg.pl/250x250"
                    },
                    "category": "main",
                    "counter": 100,
                    "type": "progressive",
                    "visibility": "surprise",
                    "group": "usage",
                    "level": 2
                })
                .expectJSONTypes({
                    "name": Object,
                    "desc": Object,
                    "icon": Object,
                    "earnedAt": String
                })

            .toss();

            frisby.create('Getting ' + cC3 + ' achievements')
                .get(url + userID + '/achievements/' + cC3)
                .expectStatus(200)
                .expectJSON({
                    "id": cC3,
                    "package": 1,
                    "desc": {
                        "en": "Cleann a Qbo (after 150 brews)",
                        "de": "Keine Angst, du hast keinen Putzfimmel. Dir liegt einfach viel an gutem Kaffee. Und der l�uft nur aus einer gepflegten Qbo-Maschine. Du hast also alles richtig gemacht. "
                    },
                    "name": {
                        "en": "Cleaning Star 3",
                        "de": "Putzaktivist 3"
                    },
                    "icon": {
                        "en": "http://fakeimg.pl/250x250",
                        "de": "http://fakeimg.pl/250x250"
                    },
                    "category": "main",
                    "counter": 150,
                    "type": "progressive",
                    "visibility": "surprise",
                    "group": "usage",
                    "level": 3
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

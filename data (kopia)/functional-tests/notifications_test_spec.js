var frisby = require('frisby');
var jasmine = require('jasmine');
var url = process.env.url;
var randomString = require('random-string');

var voID1 = "gift1level1";
var voID2 = "gift1level2";
var voID3 = "gift1level3";
var voID4 = "gift1level4";
var voID4 = "gift1level4";
var voID5 = "gift1level5";
var voID6 = "gift1level6";

var vtr = 'vouToRedee_' + randomString({ // vtr = random name to voucher for redeemed
    length: 10
});

var t = 1.5;

var code1 = 'code_' + randomString({
    length: 10
});
var code2 = 'code_' + randomString({
    length: 10
});
var code3 = 'code_' + randomString({
    length: 10
});
var code4 = 'code_' + randomString({
    length: 10
});
var code5 = 'code_' + randomString({
    length: 10
});
var code6 = 'code_' + randomString({
    length: 10
});


//---------------------------------------- functions to achieve clean badges --------------------------------
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

// ---------------------------------------------------------------------------------


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
                    "rinsingStatus": 0,
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
//-----------------------------------------------

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

var t = 1.5; //pause parameter


describe("QBO notifications' tests", function() {


    it("notifications' tests", function() {


        frisby.create('Add new codes to a voucher ' + voID1)
            .post(url + '/vouchers/' + voID1 + '/codes', [{
                "id": code1,
                "status": "active"
            }], {
                json: true
            })
            .expectStatus(200)
            .expectHeaderContains('Content-Type', 'application/json')
            .toss();

        frisby.create('Add new codes to a voucher ' + voID2)
            .post(url + '/vouchers/' + voID2 + '/codes', [{
                "id": code2,
                "status": "active"
            }], {
                json: true
            })
            .expectStatus(200)
            .expectHeaderContains('Content-Type', 'application/json')
            .toss();

        frisby.create('Add new codes to a voucher ' + voID3)
            .post(url + '/vouchers/' + voID3 + '/codes', [{
                "id": code3,
                "status": "active"
            }], {
                json: true
            })
            .expectStatus(200)
            .expectHeaderContains('Content-Type', 'application/json')
            .toss();

        frisby.create('Add new codes to a voucher ' + voID4)
            .post(url + '/vouchers/' + voID4 + '/codes', [{
                "id": code4,
                "status": "active"
            }], {
                json: true
            })
            .expectStatus(200)
            .expectHeaderContains('Content-Type', 'application/json')
            .toss();

        frisby.create('Add new codes to a voucher ' + voID5)
            .post(url + '/vouchers/' + voID5 + '/codes', [{
                "id": code5,
                "status": "active"
            }], {
                json: true
            })
            .expectStatus(200)
            .expectHeaderContains('Content-Type', 'application/json')
            .toss();

        frisby.create('Add new codes to a voucher ' + voID6)
            .post(url + '/vouchers/' + voID6 + '/codes', [{
                "id": code6,
                "status": "active"
            }], {
                json: true
            })
            .expectStatus(200)
            .expectHeaderContains('Content-Type', 'application/json')
            .toss();



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
                "optInConfirmed": true,
                "email": "hosun.lee@bornholdtlee.de",
                "tags": ["qbo", "badgesWithProgress"]
            }, {
                json: true
            })
            .expectStatus(201)


        .after(function(err, res, body) {
            var userID = res.headers.location;
            var owner = userID.substring(7);
            var uid = userID;
            var uux = userID.substr(7, 24)

            wait(t * 1000);

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
                    "icon": Object
                })

            .toss();


            var bt = 0
            while (bt < 15) {


                frisby.create('POST event for getting "king_of_qbo"  ')
                    .post(url + userID + '/events', {
                        "body": {
                            "tm": 3641671232,
                            "name": "brew",
                            "machineId": "uuid",
                            "version": "v1_2",
                            "capsuleId": "866",
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
                                "pretest": 1,
                                "cancelled": 1,
                                "coffeeAmount": 25,
                                "foamAmount": 10,
                                "milkAmount": 20
                            }
                        }

                    }, {
                        json: true
                    })
                    .expectStatus(202)
                    .toss();

                bt += 1
            }

            frisby.create('POST event for getting "Diligent Student"  ')
                .post(url + userID + '/events', {
                    "body": {
                        "tm": 3641671256,
                        "name": "tutorialPassed"

                    },
                    "tags": ["qbo", "badgesWithProgress"]
                }, {
                    json: true
                })
                .expectStatus(202)
                .toss();

            var friend = 0
            while (friend < 25) {



                frisby.create('POST event for getting tellFriend  ')
                    .post(url + userID + '/events', {
                        "body": {
                            "tm": 3641671256,
                            "name": "tellFriend"
                        },
                        "tags": [
                            "qbo",
                            "badgesWithProgress"
                        ]
                    }, {
                        json: true
                    })
                    .expectStatus(202)
                    .toss();

                friend += 1
            }



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
                .toss();




            var rinse = 0
            while (rinse < 15) {


                frisby.create('POST event for getting rinse achievements')
                    .post(url + userID + '/events', {
                            "body": {

                                "tm": 3641671243,
                                "name": "longRinse"

                            },

                            "tags": ["qbo", "badgesWithProgress"]
                        }

                        , {
                            json: true
                        })
                    .expectStatus(202)
                    .toss();

                rinse++
            }





            frisby.create('POST event for getting "surveyParticipate"')
                .post(url + userID + '/events', {
                        "body": {

                            "tm": 3641671256,
                            "name": "surveyParticipate"

                        },

                        "tags": ["qbo", "badgesWithProgress"]
                    }

                    , {
                        json: true
                    })
                .expectStatus(202)
                .toss();


            frisby.create('POST event for getting "polParticipate"')
                .post(url + userID + '/events', {
                        "body": {

                            "tm": 3641671256,
                            "name": "pollParticipate"

                        },

                        "tags": ["qbo", "badgesWithProgress"]
                    }

                    , {
                        json: true
                    })
                .expectStatus(202)
                .toss();



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




            var user1 = 'user1_' + randomString({
                length: 20
            });

            //Create first user
            frisby.create('PUT first user')
                .put(url + '/users/' + user1, {
                    "firstName": "FIRST",
                    "confirmationState": "CONFIRMED",
                    "email": "firstFF.lee@bornholdtlee.de",
                    "tags": ["qbo", "badgesWithProgress"]
                }, {
                    json: true
                })
                .expectStatus(201)
                .toss();


            var share;
            for (share = 0; share < 15; share++) {



                frisby.create('POST event for getting share recipe  ')
                    .post(url + '/users/' + user1 + '/events', {
                        "body": {
                            "tm": 3641671232,
                            "name": "brew",
                            "machineId": "uuid",
                            "version": "v1_2",
                            "capsuleId": "260",
                            "recipe": {
                                "uid": "default-1",
                                "creatorId": uux,
                                "userId": "user",
                                "userName": "Monica",
                                "name": "My coffee nr " + share,
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

                wait(100)


            }

            wait(t * 3000)
                //---------------------------------------LEVEL 2 -----------------------------------------------------
            frisby.create('Getting user LEVEL 2 ')
                .get(url + userID + '/counters/level')
                .expectStatus(200)
                .expectJSON({
                        "name": "level",
                        "value": 2
                    }

                )
                .toss();





            frisby.create('POST event for getting "recipe Author"')
                .post(url + userID + '/events', {
                        "body": {
                            "tm": 3641671256,
                            "name": "addFavouriteRecipe",
                            "recipe": {
                                "name": "Flat White"
                            }

                        },

                        "tags": ["qbo", "badgesWithProgress"]
                    }

                    , {
                        json: true
                    })
                .expectStatus(202)
                .toss();




            frisby.create('POST 8x event for achieving all badges with buying accessory ')
                .post(url + userID + '/events', {
                    "body": {
                        "tm": 3641671256,
                        "name": "buy",
                        "product": {
                            "name": "descalingCapsule",
                            "productAmount": "8",
                            "buyTimestamp": 1410767140,
                        }
                    },
                    "tags": ["qbo", "badgesWithProgress"]
                }, {
                    json: true
                })
                .expectStatus(202)
                .toss();







            var taste = 0
            for (taste = 0; taste < 15; taste++) {


                frisby.create('POST event for getting Taste rookie  ')
                    .post(url + userID + '/events', {
                        "body": {
                            "tm": 3641671232,
                            "name": "brew",
                            "machineId": "uuid",
                            "version": "v1_2",
                            "capsuleId": "260",
                            "recipe": {
                                "uid": "default-1",
                                "creatorId": userID,
                                "userId": userID,
                                "userName": "Monica",
                                "name": "My coffee  " + userID + "" + taste,
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


            frisby.create('POST event for achieving all badges with buying coffee Capsule ')
                .post(url + userID + '/events', {
                    "body": {
                        "tm": 3641671256,
                        "name": "buy",
                        "product": {
                            "name": "coffeeCapsule",
                            "productAmount": "27",
                            "buyTimestamp": 1410767140,
                        }
                    },
                    "tags": ["qbo", "badgesWithProgress"]
                }, {
                    json: true
                })
                .expectStatus(202)
                .toss();

            frisby.create('POST event for achieving all badges with buying accessory ')
                .post(url + userID + '/events', {
                    "body": {
                        "tm": 3641671256,
                        "name": "buy",
                        "product": {
                            "name": "cleaningCapsule",
                            "productAmount": "16",
                            "buyTimestamp": 1410767140,
                        }
                    },
                    "tags": ["qbo", "badgesWithProgress"]
                }, {
                    json: true
                })
                .expectStatus(202)
                .toss();

            wait(t * 1000);




            frisby.create('POST event for achieving all badges with buying accessory ')
                .post(url + userID + '/events', {
                    "body": {
                        "tm": 3641671256,
                        "name": "buy",
                        "product": {
                            "name": "accessory",
                            "productAmount": "7",
                            "buyTimestamp": 1410767140,
                        }
                    },
                    "tags": ["qbo", "badgesWithProgress"]
                }, {
                    json: true
                })
                .expectStatus(202)
                .toss();


            frisby.create('POST event for getting The subscriber  ')
                .post(url + userID + '/events', {
                    "body": {

                        "tm": 3641671256,
                        "name": "subscribeNL"

                    },
                    "tags": ["qbo", "badgesWithProgress"]
                }, {
                    json: true
                })
                .expectStatus(202)
                .toss();

            wait(t * 4000);


            //---------------------------------------LEVEL 3 -----------------------------------------------------

            frisby.create('Getting user LEVEL 3 ')
                .get(url + userID + '/counters/level')
                .expectStatus(200)
                .expectJSON({
                        "name": "level",
                        "value": 3
                    }

                )
                .toss();






            var coffeeLvl4 = 0
            while (coffeeLvl4 < 70) {


                frisby.create('POST event for getting Volcanes Antigua  ')
                    .post(url + userID + '/events', {
                        "body": {
                            "tm": 3641671232,
                            "name": "brew",
                            "machineId": "uuid",
                            "version": "v1_2",
                            "capsuleId": "195",
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

                wait(100);
                coffeeLvl4 += 1

            }

            //---------------------------------------LEVEL 4 -----------------------------------------------------
            frisby.create('Getting user LEVEL 4 ')
                .get(url + userID + '/counters/level')
                .expectStatus(200)
                .expectJSON({
                        "name": "level",
                        "value": 4
                    }

                )
                .toss();


            var coffeeLvl4a = 0
            while (coffeeLvl4a < 70) {

                frisby.create('POST event for getting Buena Enteta  ')
                    .post(url + userID + '/events', {
                        "body": {
                            "tm": 3641671232,
                            "name": "brew",
                            "machineId": "uuid",
                            "version": "v1_2",
                            "capsuleId": "130",
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

                wait(100);
                coffeeLvl4a += 1

            }




            wait(t * 5000);




            var coffeeLvl5 = 0
            while (coffeeLvl5 < 70) {



                frisby.create('POST event for getting Oro Narino')
                    .post(url + userID + '/events', {
                        "body": {
                            "tm": 3641671232,
                            "name": "brew",
                            "machineId": "uuid",
                            "version": "v1_2",
                            "capsuleId": "801",
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



                frisby.create('POST event for getting Estrada Paraiso  ')
                    .post(url + userID + '/events', {
                        "body": {
                            "tm": 3641671232,
                            "name": "brew",
                            "machineId": "uuid",
                            "version": "v1_2",
                            "capsuleId": "390",
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


                coffeeLvl5 += 1
                wait(100);

            }
            wait(t * 3000);




            //---------------------------------------LEVEL 5 -----------------------------------------------------            

            frisby.create('Getting user LEVEL 5 ')
                .get(url + userID + '/counters/level')
                .expectStatus(200)
                .expectJSON({
                        "name": "level",
                        "value": 5
                    }

                )
                .toss();


            wait(t * 3000);
            var coffeeLvl6 = 0
            while (coffeeLvl6 < 70) {


                frisby.create('POST event for getting Cafezinho Ipanema')
                    .post(url + userID + '/events', {
                        "body": {
                            "tm": 3641671232,
                            "name": "brew",
                            "machineId": "uuid",
                            "version": "v1_2",
                            "capsuleId": "671",
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


                //   
                frisby.create('POST event for getting Alta Mogiana  ')
                    .post(url + userID + '/events', {
                        "body": {
                            "tm": 3641671232,
                            "name": "brew",
                            "machineId": "uuid",
                            "version": "v1_2",
                            "capsuleId": "65",
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

                wait(100);

                coffeeLvl6 += 1
            }

            wait(t * 3000);

            //---------------------------------------LEVEL 6 -----------------------------------------------------            

            frisby.create('Getting user LEVEL 6 ')
                .get(url + userID + '/counters/level')
                .expectStatus(200)
                .expectJSON({
                        "name": "level",
                        "value": 6
                    }

                )
                .toss();


            var coffeeLvl7 = 0
            while (coffeeLvl7 < 70) {


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




                frisby.create('POST event for getting Indian Niligri ')
                    .post(url + userID + '/events', {
                        "body": {
                            "tm": 3641671232,
                            "name": "brew",
                            "machineId": "uuid",
                            "version": "v1_2",
                            "capsuleId": "866",
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


                coffeeLvl7 += 1

            }

            wait(t * 2000);
            var coffeeLvl7a = 0
            while (coffeeLvl7a < 350) {


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

                coffeeLvl7a += 1
            }

            wait(t * 1000);
            // --------------- Cleaning_Star -------
            var cleanAmount = 0
            while (cleanAmount < 3) {
                MaintenanceUpdate(10, uid)
                Clean(uid)

                cleanAmount++

            }
            // --------------------- Descale ----------------------    

            MaintenanceUpdateDescale(uid);
            Descale(uid);

            MaintenanceUpdateDescale(uid);
            Descale(uid);

            MaintenanceUpdateDescale(uid);
            Descale(uid);

            wait(t * 10000);


            //---------------------------------------LEVEL 7 -----------------------------------------------------

            frisby.create('Getting user LEVEL 7 ')
                .get(url + userID + '/counters/level')
                .expectStatus(200)
                .expectJSON({
                        "name": "level",
                        "value": 7
                    }

                )
                .toss();


            //-------------------------- checking 107 notifications for badges ---------------------------------------

            frisby.create('Getting notifications  type": "notificationEarned"')
                .get(url + userID + '/notifications?query={"type": "badgeEarned"}')
                .expectHeader('Content-Type', 'application/json')
                .expectHeader('Paginator', '{"limit":10,"offset":0,"total":107}')
                .expectStatus(200)
                .toss();

            //------------------------------- Users vouchers-----------------------------------------------------------------         


            frisby.create('Getting user voucher gift1level1')
                .get(url + userID + '/vouchers/' + voID1 + '/codes')
                .expectStatus(200)
                .toss();

            frisby.create('Getting user voucher gift1level2')
                .get(url + userID + '/vouchers/' + voID2 + '/codes')
                .expectStatus(200)
                .toss();

            frisby.create('Getting user voucher gift1level3')
                .get(url + userID + '/vouchers/' + voID3 + '/codes')
                .expectStatus(200)
                .toss();

            frisby.create('Getting user voucher gift1level4')
                .get(url + userID + '/vouchers/' + voID4 + '/codes')
                .expectStatus(200)
                .toss();

            frisby.create('Getting user voucher gift1level5')
                .get(url + userID + '/vouchers/' + voID5 + '/codes')
                .expectStatus(200)
                .toss();

            frisby.create('Getting user voucher gift1level6')
                .get(url + userID + '/vouchers/' + voID6 + '/codes')
                .expectStatus(200)
                .toss();


            //---------------------notifications "type": "notificationLevelUp"

            frisby.create('Getting user notifications  type": "notificationLevelUp"')
                .get(url + userID + '/notifications?query={"type": "notificationLevelUp","memberLevel": 2,"isRead": false,"toNextLevel": 15}')
                .expectStatus(200)
                .expectBodyContains('"memberLevel":2.0')
                .toss();

            frisby.create('Getting user notifications  type": "notificationLevelUp"')
                .get(url + userID + '/notifications?query={"type": "notificationLevelUp","memberLevel": 3,"isRead": false,"toNextLevel": 15}')
                .expectStatus(200)
                .expectBodyContains('"memberLevel":3.0')
                .toss();


            frisby.create('Getting user notifications  type": "notificationLevelUp"')
                .get(url + userID + '/notifications?query={"type": "notificationLevelUp","memberLevel": 4,"isRead": false,"toNextLevel": 15}')
                .expectStatus(200)
                .expectBodyContains('"memberLevel":4.0')
                .toss();

            frisby.create('Getting user notifications  type": "notificationLevelUp"')
                .get(url + userID + '/notifications?query={"type": "notificationLevelUp","memberLevel": 5,"isRead": false,"toNextLevel": 15}')
                .expectStatus(200)
                .expectBodyContains('"memberLevel":5.0')
                .toss();


            frisby.create('Getting user notifications  type": "notificationLevelUp"')
                .get(url + userID + '/notifications?query={"type": "notificationLevelUp","memberLevel": 6,"isRead": false,"toNextLevel": 15}')
                .expectStatus(200)
                .expectBodyContains('"memberLevel":6.0')
                .toss();

            frisby.create('Getting user notifications  type": "notificationLevelUp"')
                .get(url + userID + '/notifications?query={"type": "notificationLevelUp","memberLevel": 7,"isRead": false}')
                .expectStatus(200)
                .expectBodyContains('"memberLevel":7.0')
                .toss();

            //---------------------notifications "type": "voucherEarned" ---------------------------------------------------


            frisby.create('Getting user "voucherEarned" notifications')
                .get(url + userID + '/notifications?query={"type": "voucherEarned","memberLevel": 2}')
                .expectStatus(200)
                .expectBodyContains('"memberLevel":2')
                .toss();

            frisby.create('Getting user "voucherEarned" notifications')
                .get(url + userID + '/notifications?query={"type": "voucherEarned","memberLevel": 3}')
                .expectStatus(200)
                .expectBodyContains('"memberLevel":3')
                .toss();


            frisby.create('Getting user "voucherEarned" notifications')
                .get(url + userID + '/notifications?query={"type": "voucherEarned","memberLevel": 4}')
                .expectStatus(200)
                .expectBodyContains('"memberLevel":4')
                .toss();

            frisby.create('Getting user "voucherEarned" notifications')
                .get(url + userID + '/notifications?query={"type": "voucherEarned","memberLevel": 5}')
                .expectStatus(200)
                .expectBodyContains('"memberLevel":5')
                .toss();

            frisby.create('Getting user "voucherEarned" notifications')
                .get(url + userID + '/notifications?query={"type": "voucherEarned","memberLevel": 6}')
                .expectStatus(200)
                .expectBodyContains('"memberLevel":6')
                .toss();

            frisby.create('Getting user"voucherEarned" notifications')
                .get(url + userID + '/notifications?query={"type": "voucherEarned","memberLevel": 7}')
                .expectStatus(200)
                .expectBodyContains('"memberLevel":7')
                .toss();


            //---------------------notifications type": "voucherRedeemed-------------------------------------------

            frisby.create('Put to create a voucher ')
                .put(url + '/vouchers/' + vtr, {
                    "name": "voucher1",
                    "about": "Voucher 1"

                }, {
                    json: true
                })
                .expectStatus(201)
                .expectHeaderContains('Content-Type', 'application/json')
                .toss();


            frisby.create('Add new codes to a voucher')
                .post(url + '/vouchers/' + vtr + '/codes', [{
                    "id": "1",
                    "status": "active"
                }], {
                    json: true
                })
                .expectStatus(200)
                .expectHeaderContains('Content-Type', 'application/json')
                .toss();


            frisby.create('Add a voucher code to a user')
                .put(url + userID + '/vouchers/' + vtr, {}, {
                    json: true
                })
                .expectStatus(202)
                .expectHeaderContains('Content-Type', 'application/json')
                .toss();

            frisby.create('Redeem voucher code')
                .put(url + '/vouchers/' + vtr + '/codes/1/status/redeemed', {}, {
                    json: true
                })
                .expectStatus(200)
                .toss();


            frisby.create('Getting notification "voucherRedeemed" ')
                .get(url + userID + '/notifications?query={"type": "voucherRedeemed"}')
                .expectStatus(200)
                .expectJSON('*', {
                    "type": "voucherRedeemed"
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

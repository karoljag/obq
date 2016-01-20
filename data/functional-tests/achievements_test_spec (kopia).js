var frisby = require('frisby');
var jasmine = require('jasmine');
var url = process.env.url;
var randomString = require('random-string');

var caF = "qbo_taste_expert";
var altaMogiana_amount1 = "alta_mogiana_tester";
var altaMogiana_amount10 = "alta_mogiana_fan_1";
var altaMogiana_amount30 = "alta_mogiana_fan_2";
var altaMogiana_amount70 = "alta_mogiana_fan_3";
var babaBudan_amount1 = "baba_budan_tester";
var babaBudan_amount10 = "baba_budan_fan_1";
var babaBudan_amount30 = "baba_budan_fan_2";
var babaBudan_amount70 = "baba_budan_fan_3";
var buenaEnteta1 = "buena_enteta_tester";
var buenaEnteta10 = "buena_enteta_fan_1";
var buenaEnteta30 = "buena_enteta_fan_2";
var buenaEnteta70 = "buena_enteta_fan_3";
var cafezinhoIpanema1 = "cafezinho_ipanema_tester";
var cafezinhoIpanema10 = "cafezinho_ipanema_fan_1";
var cafezinhoIpanema30 = "cafezinho_ipanema_fan_2";
var cafezinhoIpanema70 = "cafezinho_ipanema_fan_3";
var estradaParaiso1 = "estrada_paraiso_tester";
var estradaParaiso10 = "estrada_paraiso_fan_1";
var estradaParaiso30 = "estrada_paraiso_fan_2";
var estradaParaiso70 = "estrada_paraiso_fan_3";
var indianNiligri1 = "indian_niligri_tester";
var indianNiligri10 = "indian_niligri_fan_1";
var indianNiligri30 = "indian_niligri_fan_2";
var indianNiligri70 = "indian_niligri_fan_3";
var jebenaYirgai1 = "jebena_yirga_tester";
var jebenaYirgai10 = "jebena_yirga_fan_1";
var jebenaYirgai30 = "jebena_yirga_fan_2";
var jebenaYirga70 = "jebena_yirga_fan_3";
var oroNarino_amount1 = "oro_narino_tester";
var oroNarino_amount10 = "oro_narino_fan_1";
var oroNarino_amount30 = "oro_narino_fan_2";
var oroNarino_amount70 = "oro_narino_fan_3";
var sidamaRoyal_amount1 = "sidama_royal_tester";
var sidamaRoyal_amount10 = "sidama_royal_fan_1";
var sidamaRoyal_amount30 = "sidama_royal_fan_2";
var sidamaRoyal_amount70 = "sidama_royal_fan_3";
var volcanesAntigua1 = "volcanes_antigua_tester";
var volcanesAntigua10 = "volcanes_antigua_fan_1";
var volcanesAntigua30 = "volcanes_antigua_fan_2";
var volcanesAntigua70 = "volcanes_antigua_fan_3";
var bPaa1 = "stuff_achiever_1";
var bPaa3 = "stuff_achiever_2";
var bPaa7 = "stuff_achiever_3";
var buy_cc4 = "clean_agent_1";
var buy_cc8 = "clean_agent_2";
var buy_cc16 = "clean_agent_3";
var bp_cofCap8 = "cube_collector_1";
var bp_cofCap27 = "cube_collector_2";
var bPdC2 = "descale_sheriff_1";
var bPdC4 = "descale_sheriff_2";
var bPdC8 = "descale_sheriff_3";
var cC1 = "cleaning_star_1";
var cC2 = "cleaning_star_2";
var cC3 = "cleaning_star_3";
var crRec1 = "taste_rookie";
var crRec5 = "taste_designer_1";
var crRec10 = "taste_designer_2";
var crRec15 = "taste_designer_3";
var dT320 = "descale_champion_1";
var dT640 = "descale_champion_2";
var dT960 = "descale_champion_3";
var diliStu = "diligent_student";
var mO = "machine_owner";
var mMO = "milk_master_owner";
var miCo3000 = "milk_fan_1";
var miCo10000 = "milk_fan_2";
var miCo30000 = "milk_fan_3";
var miCo100000 = "milk_fan_4";
var suPa = "opinion_count";
var poPart = "opinion_share";
var faRe = "recipe_author";
var bP1 = "king_of_qbo_1";
var bP5 = "king_of_qbo_2";
var bP10 = "king_of_qbo_3";
var bP15 = "king_of_qbo_4";
var lR5 = "rinse_master_1";
var lR10 = "rinse_master_2";
var lR15 = "rinse_master_3";
var sR1 = "reciper_sharer_1";
var sR5 = "reciper_sharer_5";
var sR10 = "reciper_sharer_10";
var sR15 = "reciper_sharer_15";
var TF5 = "qbo_ambasador_1";
var TF10 = "qbo_ambasador_2";
var TF25 = "qbo_ambasador_3";
var sub = "the_subscriber";
var we = "welcome";
var achID10 = "hot_10";
var achID20 = "hot_20";
var achID30 = "hot_30";
var achID40 = "hot_40";
var achID50 = "hot_50";
var achID60 = "hot_60";
var achID70 = "hot_70";
var achID80 = "hot_80";
var achID90 = "hot_90";
var achID100 = "hot_100";
var achID110 = "hot_110";
var achID120 = "hot_120";
var achID130 = "hot_130";
var achID140 = "hot_140";
var achID150 = "hot_150";
var achID200 = "hot_200";
var achID250 = "hot_250";
var achID300 = "hot_300";
var achID400 = "hot_400";



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

var t = 2; //pause parameter

 
function MaintenanceUpdate(mu, uid) {
    var clean = 0

    while (clean < mu) {


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


describe("QBO tests", function() {


    it("Test for checking if all badges(107) are acquired and levels (7) achieved ", function() {


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
                "optInConfirmed": true,
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


                //---------------------------------------LEVEL 1 -----------------------------------------------------

                frisby.create('Getting user LEVEL 1 ')
                    .get(url + userID + '/counters/level')
                    .expectStatus(200)
                    .expectJSON({
                            "name": "level",
                            "value": 1
                        }

                    )
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

                    rinse ++
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
                                    "creatorId": uux,
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

                wait(t * 5000);


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



                //-----------------------------------ACHEIVEMENTS---------------------------------------------------------------   


                frisby.create('Getting "welcome" achievement')
                    .get(url + userID + '/achievements/' + we)
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


                frisby.create('Getting "subscriber" achievement')
                    .get(url + userID + '/achievements/' + sub)
                    .expectStatus(200)
                    .expectJSON({
                        "id": "the_subscriber",
                        "package": 21,
                        "desc": {
                            "en": "Subscribe to product information NL",
                            "de": "Keine Frage, du bist immer auf dem neusten Stand der Technik! Aber seit deiner Anmeldung f�r unsere Qbo-Post bist du jetzt auch immer auf dem neusten Stand des guten Geschmacks."
                        },
                        "name": {
                            "en": "The subscriber",
                            "de": "Qbo-Post"
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


                frisby.create('Getting ' + TF5 + ' achievement')
                    .get(url + userID + '/achievements/' + TF5)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "social",
                        "id": "qbo_ambasador_1",
                        "package": 32,
                        "group": "tellFriend",
                        "counter": 5,
                        "level": 1,
                        "visibility": "normal",
                        "type": "progressive",

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();



                frisby.create('Getting ' + TF10 + ' achievement')
                    .get(url + userID + '/achievements/' + TF10)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "social",
                        "id": "qbo_ambasador_2",
                        "package": 32,
                        "group": "tellFriend",
                        "counter": 10,
                        "level": 1,
                        "visibility": "normal",
                        "type": "progressive",

                    })

                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();



                frisby.create('Getting ' + TF25 + ' achievement')
                    .get(url + userID + '/achievements/' + TF25)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "social",
                        "id": "qbo_ambasador_3",
                        "package": 32,
                        "group": "tellFriend",
                        "counter": 25,
                        "level": 1,
                        "visibility": "normal",
                        "type": "progressive",

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();



                frisby.create('Getting "Reciper Sharer 1" achievement')
                    .get(url + userID + '/achievements/reciper_sharer_1')
                    .expectStatus(200)
                    .expectJSON({
                        "id": "reciper_sharer_1",
                        "package": 33,
                        "desc": {
                            "en": ""
                        },
                        "name": {
                            "en": "Reciper Sharer 1",
                            "de": "Rezepte Teiler 1"
                        },
                        "icon": {
                            "en": "http://fakeimg.pl/250x250",
                            "de": "http://fakeimg.pl/250x250"
                        },
                        "category": "social",
                        "counter": 1,
                        "type": "single",
                        "visibility": "normal",
                        "group": "shareRecipe",
                        "level": 1
                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object,
                        "earnedAt": String

                    })
                    .toss();

                frisby.create('Getting "Reciper Sharer 2" achievement')
                    .get(url + userID + '/achievements/reciper_sharer_2')
                    .expectStatus(200)
                    .expectJSON({
                        "id": "reciper_sharer_2",
                        "package": 33,
                        "desc": {
                            "en": ""
                        },
                        "name": {
                            "en": "Reciper Sharer 2",
                            "de": "Rezepte Teiler 2"
                        },
                        "icon": {
                            "en": "http://fakeimg.pl/250x250",
                            "de": "http://fakeimg.pl/250x250"
                        },
                        "category": "social",
                        "counter": 5,
                        "type": "progressive",
                        "visibility": "normal",
                        "group": "shareRecipe",
                        "level": 1
                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object,
                        "earnedAt": String

                    })
                    .toss();


                frisby.create('Getting "Reciper Sharer 3" achievement')
                    .get(url + userID + '/achievements/reciper_sharer_3')
                    .expectStatus(200)
                    .expectJSON({
                        "id": "reciper_sharer_3",
                        "package": 33,
                        "desc": {
                            "en": ""
                        },
                        "name": {
                            "en": "Reciper Sharer 3",
                            "de": "Rezepte Teiler 3"
                        },
                        "icon": {
                            "en": "http://fakeimg.pl/250x250",
                            "de": "http://fakeimg.pl/250x250"
                        },
                        "category": "social",
                        "counter": 10,
                        "type": "progressive",
                        "visibility": "normal",
                        "group": "shareRecipe",
                        "level": 1
                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object,
                        "earnedAt": String

                    })
                    .toss();



                frisby.create('Getting "Reciper Sharer 4" achievement')
                    .get(url + userID + '/achievements/reciper_sharer_4')
                    .expectStatus(200)
                    .expectJSON({
                        "id": "reciper_sharer_4",
                        "package": 33,
                        "desc": {
                            "en": ""
                        },
                        "name": {
                            "en": "Reciper Sharer 4",
                            "de": "Rezepte Teiler 4"
                        },
                        "icon": {
                            "en": "http://fakeimg.pl/250x250",
                            "de": "http://fakeimg.pl/250x250"
                        },
                        "category": "social",
                        "counter": 15,
                        "type": "progressive",
                        "visibility": "normal",
                        "group": "shareRecipe",
                        "level": 1
                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object,
                        "earnedAt": String

                    })
                    .toss();



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


                frisby.create('Getting ' + lR5 + ' achievements')
                    .get(url + userID + '/achievements/' + lR5)
                    .expectStatus(200)
                    .expectJSON({
                        "id": lR5,

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();


                frisby.create('Getting ' + lR10 + ' achievements')
                    .get(url + userID + '/achievements/' + lR10)
                    .expectStatus(200)
                    .expectJSON({
                        "id": lR10,

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })

                .toss();

                frisby.create('Getting ' + lR15 + ' achievements')
                    .get(url + userID + '/achievements/' + lR15)
                    .expectStatus(200)
                    .expectJSON({
                        "id": lR15,

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();


                frisby.create('Getting ' + bP1 + ' achievement')
                    .get(url + userID + '/achievements/' + bP1)
                    .expectStatus(200)
                    .expectJSON({
                        "id": "king_of_qbo_1",
                        "package": 35,
                        "desc": {
                            "en": ""
                        },
                        "name": {
                            "en": "King of Qbo",
                            "de": "König der Bohnen"
                        },
                        "icon": {
                            "en": "http://fakeimg.pl/250x250",
                            "de": "http://fakeimg.pl/250x250"
                        },
                        "category": "trial",
                        "counter": 1,
                        "type": "progressive",
                        "visibility": "normal",
                        "group": "addFavoriteRecipe",
                        "level": 1
                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object,
                        "earnedAt": String
                    })
                    .toss();

                wait(t * 1000);

                frisby.create('Getting ' + bP5 + ' achievement')
                    .get(url + userID + '/achievements/' + bP5)
                    .expectStatus(200)
                    .expectJSON({
                        "id": "king_of_qbo_2",
                        "package": 35,
                        "desc": {
                            "en": ""
                        },
                        "name": {
                            "en": "King of Qbo 2",
                            "de": "König der Bohnen 2"
                        },
                        "icon": {
                            "en": "http://fakeimg.pl/250x250",
                            "de": "http://fakeimg.pl/250x250"
                        },
                        "category": "trial",
                        "counter": 1,
                        "type": "progressive",
                        "visibility": "normal",
                        "group": "addFavoriteRecipe",
                        "level": 1
                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object,
                        "earnedAt": String
                    })
                    .toss();


                frisby.create('Getting ' + bP10 + ' achievement')
                    .get(url + userID + '/achievements/' + bP10)
                    .expectStatus(200)
                    .expectJSON({
                        "id": "king_of_qbo_3",
                        "package": 35,
                        "desc": {
                            "en": ""
                        },
                        "name": {
                            "en": "King of Qbo 3",
                            "de": "König der Bohnen 3"
                        },
                        "icon": {
                            "en": "http://fakeimg.pl/250x250",
                            "de": "http://fakeimg.pl/250x250"
                        },
                        "category": "trial",
                        "counter": 1,
                        "type": "progressive",
                        "visibility": "normal",
                        "group": "addFavoriteRecipe",
                        "level": 1
                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object,
                        "earnedAt": String
                    })
                    .toss();


                frisby.create('Getting ' + bP15 + ' achievement')
                    .get(url + userID + '/achievements/' + bP15)
                    .expectStatus(200)
                    .expectJSON({
                        "id": "king_of_qbo_4",
                        "package": 35,
                        "desc": {
                            "en": ""
                        },
                        "name": {
                            "en": "King of Qbo 4",
                            "de": "König der Bohnen 4"
                        },
                        "icon": {
                            "en": "http://fakeimg.pl/250x250",
                            "de": "http://fakeimg.pl/250x250"
                        },
                        "category": "trial",
                        "counter": 1,
                        "type": "progressive",
                        "visibility": "normal",
                        "group": "addFavoriteRecipe",
                        "level": 1
                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object,
                        "earnedAt": String
                    })
                    .toss();


                frisby.create('Getting ' + poPart + ' achievements')
                    .get(url + userID + '/achievements/' + poPart)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "other",

                        "package": 29,
                        "counter": 1,
                        "level": 1,
                        "visibility": "normal",
                        "type": "onetime",
                        "id": "opinion_share",

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })


                .toss();



                frisby.create('Getting ' + suPa + ' achievement')
                    .get(url + userID + '/achievements/' + suPa)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "other",
                        "group": "usage",
                        "package": 30,
                        "counter": 1,
                        "level": 1,
                        "visibility": "surprise",
                        "type": "onetime",
                        "id": "opinion_count"
                    })
                    .toss();



                frisby.create('Getting ' + miCo3000 + ' achievement')
                    .get(url + userID + '/achievements/' + miCo3000)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "milk_fan_1",
                        "package": 13,
                        "group": "brew",
                        "counter": 3000,
                        "level": 1,
                        "visibility": "normal",
                        "type": "progressive"

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })

                .toss();

                frisby.create('Getting ' + miCo10000 + ' achievement')
                    .get(url + userID + '/achievements/' + miCo10000)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "milk_fan_2",
                        "package": 13,
                        "group": "brew",
                        "counter": 10000,
                        "level": 1,
                        "visibility": "normal",
                        "type": "progressive"

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting ' + miCo30000 + ' achievement')
                    .get(url + userID + '/achievements/' + miCo30000)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "milk_fan_3",
                        "package": 13,
                        "group": "brew",
                        "counter": 30000,
                        "level": 1,
                        "visibility": "normal",
                        "type": "progressive"

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting ' + miCo100000 + ' achievement')
                    .get(url + userID + '/achievements/' + miCo100000)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "milk_fan_4",
                        "package": 13,
                        "group": "brew",
                        "counter": 100000,
                        "level": 1,
                        "visibility": "surprise",
                        "type": "progressive"

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();


                frisby.create('Getting ' + mMO + ' achievement')
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


                frisby.create('Getting "Diligent Student" achievement')
                    .get(url + userID + '/achievements/' + diliStu)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "other",
                        "package": 18,
                        "counter": 1,
                        "visibility": "standard",
                        "type": "onetime",
                        "id": "diligent_student",

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
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



                frisby.create('Getting :' + bPdC2)
                    .get(url + userID + '/achievements/' + bPdC2)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "descale_sheriff_1",
                        "package": 38,
                        "group": "buy",
                        "counter": 2,
                        "level": 1,
                        "visibility": "normal",
                        "type": "progressive",
                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();


                frisby.create('Getting :' + bPdC4)
                    .get(url + userID + '/achievements/' + bPdC4)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "descale_sheriff_2",
                        "package": 38,
                        "group": "buy",
                        "counter": 4,
                        "level": 1,
                        "visibility": "normal",
                        "type": "progressive",
                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })


                .toss();

                frisby.create('Getting :' + bPdC8)
                    .get(url + userID + '/achievements/' + bPdC8)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "descale_sheriff_3",
                        "package": 38,
                        "group": "buy",
                        "counter": 8,
                        "level": 1,
                        "visibility": "normal",
                        "type": "progressive",
                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })


                .toss();



                frisby.create('Getting' + bp_cofCap8)
                    .get(url + userID + '/achievements/' + bp_cofCap8)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "cube_collector_1",
                        "package": 39,
                        "group": "buy",
                        "counter": 8,
                        "level": 1,
                        "visibility": "normal",
                        "type": "progressive"

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })


                .toss();

                frisby.create('Getting' + bp_cofCap27)
                    .get(url + userID + '/achievements/' + bp_cofCap27)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "cube_collector_2",
                        "package": 39,
                        "group": "buy",
                        "counter": 27,
                        "level": 1,
                        "visibility": "normal",
                        "type": "progressive"

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();


                frisby.create('Getting' + buy_cc4)
                    .get(url + userID + '/achievements/' + buy_cc4)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "clean_agent_1",
                        "package": 37,
                        "group": "buy",
                        "counter": 4,
                        "level": 1,
                        "visibility": "normal",
                        "type": "progressive",
                    })

                .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();


                frisby.create('Getting' + buy_cc8)
                    .get(url + userID + '/achievements/' + buy_cc8)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "clean_agent_2",
                        "package": 37,
                        "group": "buy",
                        "counter": 8,
                        "level": 1,
                        "visibility": "normal",
                        "type": "progressive",
                    })

                .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting' + buy_cc16)
                    .get(url + userID + '/achievements/' + buy_cc16)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "clean_agent_3",
                        "package": 37,
                        "group": "buy",
                        "counter": 16,
                        "level": 1,
                        "visibility": "normal",
                        "type": "progressive",
                    })

                .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();



                frisby.create('Getting "buyProduct_accessory_amount1"')
                    .get(url + userID + '/achievements/' + bPaa1)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "stuff_achiever_1",

                        "package": 36,
                        "group": "buy",
                        "counter": 1,
                        "level": 1,
                        "visibility": "normal",

                        "type": "progressive",
                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting "buyProduct_accessory_amount3"')
                    .get(url + userID + '/achievements/' + bPaa3)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "stuff_achiever_2",

                        "package": 36,
                        "group": "buy",
                        "counter": 3,
                        "level": 1,
                        "visibility": "normal",

                        "type": "progressive",
                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting "buyProduct_accessory_amount7"')
                    .get(url + userID + '/achievements/' + bPaa7)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "stuff_achiever_3",

                        "package": 36,
                        "group": "buy",
                        "counter": 7,
                        "level": 1,
                        "visibility": "normal",

                        "type": "progressive",
                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();


                frisby.create('Getting ' + volcanesAntigua1 + ' achievement')
                    .get(url + userID + '/achievements/' + volcanesAntigua1)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "volcanes_antigua_tester",
                        "package": 3,
                        "group": "brew",
                        "counter": 1,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",
                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting ' + volcanesAntigua10 + ' achievement')
                    .get(url + userID + '/achievements/' + volcanesAntigua10)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "volcanes_antigua_fan_1",
                        "package": 3,
                        "group": "brew",
                        "counter": 10,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",
                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting ' + volcanesAntigua30 + ' achievement')
                    .get(url + userID + '/achievements/' + volcanesAntigua30)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "volcanes_antigua_fan_2",
                        "package": 3,
                        "group": "brew",
                        "counter": 30,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",
                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();


                frisby.create('Getting ' + volcanesAntigua70 + ' achievement')
                    .get(url + userID + '/achievements/' + volcanesAntigua70)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "volcanes_antigua_fan_3",
                        "package": 3,
                        "group": "brew",
                        "counter": 70,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",
                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();



                frisby.create('Getting ' + sidamaRoyal_amount1 + ' achievement')
                    .get(url + userID + '/achievements/' + sidamaRoyal_amount1)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "sidama_royal_tester",
                        "package": 9,
                        "group": "brew",
                        "counter": 1,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting ' + sidamaRoyal_amount10 + ' achievement')
                    .get(url + userID + '/achievements/' + sidamaRoyal_amount10)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "sidama_royal_fan_1",
                        "package": 9,
                        "group": "brew",
                        "counter": 10,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting ' + sidamaRoyal_amount30 + ' achievement')
                    .get(url + userID + '/achievements/' + sidamaRoyal_amount30)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "sidama_royal_fan_2",
                        "package": 9,
                        "group": "brew",
                        "counter": 30,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();


                frisby.create('Getting ' + sidamaRoyal_amount70 + ' achievement')
                    .get(url + userID + '/achievements/' + sidamaRoyal_amount70)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "sidama_royal_fan_3",
                        "package": 9,
                        "group": "brew",
                        "counter": 70,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();


                frisby.create('Getting ' + oroNarino_amount1 + ' achievement')
                    .get(url + userID + '/achievements/' + oroNarino_amount1)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "oro_narino_tester",
                        "package": 4,
                        "group": "brew",
                        "counter": 1,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive"

                    })

                .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting ' + oroNarino_amount10 + ' achievement')
                    .get(url + userID + '/achievements/' + oroNarino_amount10)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "oro_narino_fan_1",
                        "package": 4,
                        "group": "brew",
                        "counter": 10,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive"

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting ' + oroNarino_amount30 + ' achievement')
                    .get(url + userID + '/achievements/' + oroNarino_amount30)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "oro_narino_fan_2",
                        "package": 4,
                        "group": "brew",
                        "counter": 30,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive"

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting ' + oroNarino_amount70 + ' achievement')
                    .get(url + userID + '/achievements/' + oroNarino_amount70)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "oro_narino_fan_3",
                        "package": 4,
                        "group": "brew",
                        "counter": 70,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive"

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();



                frisby.create('Getting ' + jebenaYirgai1 + ' achievement')
                    .get(url + userID + '/achievements/' + jebenaYirgai1)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "jebena_yirga_tester",
                        "package": 4,
                        "group": "brew",
                        "counter": 1,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive"
                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting ' + jebenaYirgai10 + ' achievement')
                    .get(url + userID + '/achievements/' + jebenaYirgai10)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "jebena_yirga_fan_1",
                        "package": 4,
                        "group": "brew",
                        "counter": 10,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive"
                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();


                frisby.create('Getting ' + jebenaYirgai30 + ' achievement')
                    .get(url + userID + '/achievements/' + jebenaYirgai30)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "jebena_yirga_fan_2",
                        "package": 4,
                        "group": "brew",
                        "counter": 30,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive"
                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();


                frisby.create('Getting ' + jebenaYirga70 + ' achievement')
                    .get(url + userID + '/achievements/' + jebenaYirga70)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "jebena_yirga_fan_3",
                        "package": 4,
                        "group": "brew",
                        "counter": 70,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive"
                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();



                frisby.create('Getting ' + indianNiligri1 + ' achievement')
                    .get(url + userID + '/achievements/' + indianNiligri1)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "indian_niligri_tester",
                        "package": 8,
                        "group": "brew",
                        "counter": 1,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })

                    .toss();

                frisby.create('Getting ' + indianNiligri10 + ' achievement')
                    .get(url + userID + '/achievements/' + indianNiligri10)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "indian_niligri_fan_1",
                        "package": 8,
                        "group": "brew",
                        "counter": 10,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",

                    })

                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting ' + indianNiligri30 + ' achievement')
                    .get(url + userID + '/achievements/' + indianNiligri30)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "indian_niligri_fan_2",
                        "package": 8,
                        "group": "brew",
                        "counter": 30,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",

                    })

                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();


                frisby.create('Getting ' + indianNiligri70 + ' achievement')
                    .get(url + userID + '/achievements/' + indianNiligri70)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "indian_niligri_fan_3",
                        "package": 8,
                        "group": "brew",
                        "counter": 70,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",

                    })

                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();


                frisby.create('Getting ' + estradaParaiso1 + ' achievement')
                    .get(url + userID + '/achievements/' + estradaParaiso1)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "estrada_paraiso_tester",
                        "package": 5,
                        "group": "brew",
                        "counter": 1,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",

                    })

                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting ' + estradaParaiso10 + ' achievement')
                    .get(url + userID + '/achievements/' + estradaParaiso10)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "estrada_paraiso_fan_1",
                        "package": 5,
                        "group": "brew",
                        "counter": 10,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",

                    })

                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting ' + estradaParaiso30 + ' achievement')
                    .get(url + userID + '/achievements/' + estradaParaiso30)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "estrada_paraiso_fan_2",
                        "package": 5,
                        "group": "brew",
                        "counter": 30,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",

                    })

                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();


                frisby.create('Getting ' + estradaParaiso70 + ' achievement')
                    .get(url + userID + '/achievements/' + estradaParaiso70)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "estrada_paraiso_fan_3",
                        "package": 5,
                        "group": "brew",
                        "counter": 70,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",

                    })

                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();



                frisby.create('Getting ' + cafezinhoIpanema1 + ' achievement')
                    .get(url + userID + '/achievements/' + cafezinhoIpanema1)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "cafezinho_ipanema_tester",

                        "package": 11,
                        "group": "brew",
                        "counter": 1,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",

                    })

                .expectJSONTypes({
                    "name": Object,
                    "desc": Object,
                    "icon": Object
                })

                .toss();

                frisby.create('Getting ' + cafezinhoIpanema10 + ' achievement')
                    .get(url + userID + '/achievements/' + cafezinhoIpanema10)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "cafezinho_ipanema_fan_1",
                        "package": 11,
                        "group": "brew",
                        "counter": 10,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })

                .toss();

                frisby.create('Getting ' + cafezinhoIpanema30 + ' achievement')
                    .get(url + userID + '/achievements/' + cafezinhoIpanema30)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "cafezinho_ipanema_fan_2",

                        "package": 11,
                        "group": "brew",
                        "counter": 30,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",

                    })

                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();


                frisby.create('Getting ' + cafezinhoIpanema70 + ' achievement')
                    .get(url + userID + '/achievements/' + cafezinhoIpanema70)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "cafezinho_ipanema_fan_3",
                        "package": 11,
                        "group": "brew",
                        "counter": 70,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();



                frisby.create('Getting' + caF + 'achievement')
                    .get(url + userID + '/achievements/' + caF)
                    .expectStatus(200)
                    .expectJSON({
                        "id": caF,
                        "package": 12,
                        "group": "brew",
                        "counter": 1,
                        "level": 1,
                        "visibility": "surprise",
                        "type": "onetime",

                    })

                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting ' + altaMogiana_amount1 + ' achievement')
                    .get(url + userID + '/achievements/' + altaMogiana_amount1)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "alta_mogiana_tester",
                        "package": 2,
                        "group": "brew",
                        "counter": 1,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive"

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting ' + altaMogiana_amount10 + ' achievement')
                    .get(url + userID + '/achievements/' + altaMogiana_amount10)
                    .expectStatus(200)
                    .expectJSON({
                        "id": "alta_mogiana_fan_1",
                        "package": 2,
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
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting ' + altaMogiana_amount30 + ' achievement')
                    .get(url + userID + '/achievements/' + altaMogiana_amount30)
                    .expectStatus(200)
                    .expectJSON({
                        "id": "alta_mogiana_fan_2",
                        "package": 2,
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
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting ' + altaMogiana_amount70 + ' achievement')
                    .get(url + userID + '/achievements/' + altaMogiana_amount70)
                    .expectStatus(200)
                    .expectJSON({
                        "id": "alta_mogiana_fan_3",
                        "package": 2,
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
                        "icon": Object
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
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting ' + babaBudan_amount10 + ' achievement')
                    .get(url + userID + '/achievements/' + babaBudan_amount10)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "baba_budan_fan_1",
                        "package": 7,
                        "group": "brew",
                        "counter": 10,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting ' + babaBudan_amount30 + ' achievement')
                    .get(url + userID + '/achievements/' + babaBudan_amount30)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "baba_budan_fan_2",
                        "package": 7,
                        "group": "brew",
                        "counter": 30,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();


                frisby.create('Getting' + babaBudan_amount70 + 'achievement')
                    .get(url + userID + '/achievements/' + babaBudan_amount70)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "baba_budan_fan_3",
                        "package": 7,
                        "group": "brew",
                        "counter": 70,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting ' + buenaEnteta1 + ' achievement')
                    .get(url + userID + '/achievements/' + buenaEnteta1)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "buena_enteta_tester",
                        "package": 6,
                        "group": "brew",
                        "counter": 1,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive"
                    })

                .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting ' + buenaEnteta10 + ' achievement')
                    .get(url + userID + '/achievements/' + buenaEnteta10)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "buena_enteta_fan_1",
                        "package": 6,
                        "group": "brew",
                        "counter": 10,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive"

                    })

                .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting ' + buenaEnteta30 + ' achievement')
                    .get(url + userID + '/achievements/' + buenaEnteta30)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "buena_enteta_fan_2",
                        "package": 6,
                        "group": "brew",
                        "counter": 30,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive"

                    })

                .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();


                frisby.create('Getting ' + buenaEnteta70 + ' achievement')
                    .get(url + userID + '/achievements/' + buenaEnteta70)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": "buena_enteta_fan_3",
                        "package": 6,
                        "group": "brew",
                        "counter": 70,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive"

                    })

                .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();



                frisby.create('Getting ' + achID10 + ' achievement')
                    .get(url + userID + '/achievements/' + achID10)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": achID10,
                        "package": 1,
                        "group": "brew",
                        "counter": 10,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting ' + achID20 + ' achievement')
                    .get(url + userID + '/achievements/' + achID20)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": achID20,
                        "package": 1,
                        "group": "brew",
                        "counter": 20,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting ' + achID30 + ' achievement')
                    .get(url + userID + '/achievements/' + achID30)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": achID30,
                        "package": 1,
                        "group": "brew",
                        "counter": 30,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting ' + achID40 + ' achievement')
                    .get(url + userID + '/achievements/' + achID40)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": achID40,
                        "package": 1,
                        "group": "brew",
                        "counter": 40,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting ' + achID50 + ' achievement')
                    .get(url + userID + '/achievements/' + achID50)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": achID50,
                        "package": 1,
                        "group": "brew",
                        "counter": 50,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting ' + achID60 + ' achievement')
                    .get(url + userID + '/achievements/' + achID60)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": achID60,
                        "package": 1,
                        "group": "brew",
                        "counter": 60,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting ' + achID70 + ' achievement')
                    .get(url + userID + '/achievements/' + achID70)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": achID70,
                        "package": 1,
                        "group": "brew",
                        "counter": 70,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting ' + achID80 + ' achievement')
                    .get(url + userID + '/achievements/' + achID80)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": achID80,
                        "package": 1,
                        "group": "brew",
                        "counter": 80,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting ' + achID90 + ' achievement')
                    .get(url + userID + '/achievements/' + achID90)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": achID90,
                        "package": 1,
                        "group": "brew",
                        "counter": 90,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();


                frisby.create('Getting ' + achID100 + ' achievement')
                    .get(url + userID + '/achievements/' + achID100)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": achID100,
                        "package": 1,
                        "group": "brew",
                        "counter": 100,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting ' + achID110 + ' achievement')
                    .get(url + userID + '/achievements/' + achID110)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": achID110,
                        "package": 1,
                        "group": "brew",
                        "counter": 110,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting ' + achID120 + ' achievement')
                    .get(url + userID + '/achievements/' + achID120)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": achID120,
                        "package": 1,
                        "group": "brew",
                        "counter": 120,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting ' + achID130 + ' achievement')
                    .get(url + userID + '/achievements/' + achID130)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": achID130,
                        "package": 1,
                        "group": "brew",
                        "counter": 130,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting ' + achID140 + ' achievement')
                    .get(url + userID + '/achievements/' + achID140)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": achID140,
                        "package": 1,
                        "group": "brew",
                        "counter": 140,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();

                frisby.create('Getting ' + achID150 + ' achievement')
                    .get(url + userID + '/achievements/' + achID150)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": achID150,
                        "package": 1,
                        "group": "brew",
                        "counter": 150,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();


                frisby.create('Getting ' + achID200 + ' achievement')
                    .get(url + userID + '/achievements/' + achID200)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": achID200,
                        "package": 1,
                        "group": "brew",
                        "counter": 200,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();


                frisby.create('Getting ' + achID250 + ' achievement')
                    .get(url + userID + '/achievements/' + achID250)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": achID250,
                        "package": 1,
                        "group": "brew",
                        "counter": 250,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();


                frisby.create('Getting ' + achID300 + ' achievement')
                    .get(url + userID + '/achievements/' + achID300)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": achID300,
                        "package": 1,
                        "group": "brew",
                        "counter": 300,
                        "level": 1,
                        "visibility": "standard",
                        "type": "progressive",

                    })
                    .expectJSONTypes({
                        "name": Object,
                        "desc": Object,
                        "icon": Object
                    })
                    .toss();


                frisby.create('Getting ' + achID400 + ' achievement')
                    .get(url + userID + '/achievements/' + achID400)
                    .expectStatus(200)
                    .expectJSON({
                        "category": "frequency",
                        "id": achID400,
                        "package": 1,
                        "group": "brew",
                        "counter": 400,
                        "level": 1,
                        "visibility": "surprise",
                        "type": "onetime",

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

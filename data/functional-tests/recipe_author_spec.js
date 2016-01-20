var frisby = require('frisby');
var jasmine = require('jasmine');
var url = process.env.url;

faRe = "recipe_author";

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


        //Create specyfic user
        frisby.create('POST one user')
            .post(url + '/users', {
                "firstName": "UserQBO",
                "tags": ["qbo", "badgesWithProgress"]
            }, {
                json: true
            })
            .expectStatus(201)
            .expectHeaderContains('Content-Type', 'application/json')

        .after(function(err, res, body) {
            var userID = res.headers.location;

            wait(1000);


            //Sending event
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

            wait(3000);


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

            frisby.create('Getting ' + faRe + ' achievement')
                .get(url + userID + '/achievements/' + faRe)
                .expectStatus(200)
                .expectJSON({
                        "category": "social",
                        "id": "recipe_author",
                        "package": 35,
                        "group": "addFavoriteRecipe",
                        "counter": 1,
                        "level": 1,
                        "visibility": "normal",
                        "type": "single",

                    }

                )
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

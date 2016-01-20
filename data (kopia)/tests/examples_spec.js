// var frisby = require('frisby');
var frisby = require('../raml/node_modules/frisby');
//var jasmine = require('jasmine');
var url = 'http://217.74.73.117:80';

frisby.globalSetup({ // globalSetup is for ALL requests
  request: {
    headers: { 'Content-Type': 'application/json' }
  }
});

function randomHash() {
  return Math.random().toString(36).substring(7);
}


describe("Qbo examples for API integrations v0.1", function() {


  var userId = null,
    tagId = 'tag_'+randomHash();

  it("Examples set 1", function() {

    // add new tag
    frisby.create('create new tag')
      .put(url + '/tags/'+tagId, {}, {json:true})
      .expectStatus(201)
      .afterJSON(function(json) {

        //Create specyfic user
        frisby.create('POST one user')
          .post(url + '/users', {
            name: 'test',
            surname: "test",
            isActive: true,
            phone: '111222333'
          }, {
            json: true
          })
          .expectStatus(201)
          .expectHeaderContains('Content-Type', 'application/json')
          .expectJSON({
            name: 'test'
          })
          .expectJSONTypes({
            id: String,
            name: String
          })

          .afterJSON(function(json) {
            userId = json.id;


            //Get user by id
            frisby.create('Get user by id')
              .get(url + '/users/'+userId)
              .expectStatus(200)
              .afterJSON(function(json) {

              })
              .toss();

            //Get user notifications
            frisby.create('Get user notifications')
              .get(url + '/users/'+userId+'/notifications')
              .expectStatus(200)
              .afterJSON(function(json) {

              })
              .inspectJSON()
              .toss();

            //Get achievements list
            frisby.create('Get achievements list')
              .get(url + '/achievements')
              .expectStatus(200)
              .afterJSON(function(json) {

              })
              .inspectJSON()
              .toss();

            //Get achievements list by tag
            frisby.create('Get achievements list by tag')
              .get(url + '/achievements?query={"tags":"'+tagId+'"}')
              .expectStatus(200)
              .afterJSON(function(json) {

              })
              .toss();


            //Send event to user
            frisby.create('Send event to user')
              .post(url + '/users/'+userId+'/events', {
                "body": {
                  "capsuleId": "132435"
                },
                "tags": [tagId]
              }, {json: true})
              .expectStatus(202)
              .toss();

          })
          .toss();

      })
      .toss();



    //Get users list
    frisby.create('Get users list')
      .get(url + '/users')
      .expectStatus(200)
      .afterJSON(function(json) {

      })
      .toss();




  });
});

var request = require('request');
var app = require('./app/app.js');
var base_urlog = "http://localhost:3000/login";
var base_url = "http://localhost:3000/";

describe('Basic hello world test', function(){
	it("should respond with hello world", function(done) {
	  request("http://localhost:3000/", function(error, response, body){
	    done();
	  });
	}, 250); // timeout after 250 ms

	it("returns status code 200", function() {
	      request.get(base_url, function(error, response, body) {
	      	expect(response.statusCode).toBe(200);
	});

	it("returns status code 200", function() {
	      request.get(base_urlog, function(error, response, body) {
	      	expect(response.statusCode).toBe(200);
	});


})



/**
 * Showing with the Express framwork http://expressjs.com/
 * Express must be installed for this sample to work
 */

var tropoapi = require('tropo-webapi');
var express = require('express');
var app = express();
var sys = require('util');
var bodyParser = require('body-parser');

/**
 * Required to process the HTTP body
 * req.body has the Object while req.rawBody has the JSON string
 */
app.use(bodyParser.urlencoded({'extended' : 'true'}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send('app must be called from tropo');
});

app.post('/', function(req, res){
	sys.puts('answering call');
	// Create a new instance of the TropoWebAPI object.
	var tropo = new tropoapi.TropoWebAPI();
	// Use the say method https://www.tropo.com/docs/webapi/say.htm
	tropo.say("Welcome to my Tropo Web API node demo.");

	// Demonstrates how to use the base Tropo action classes.
	var say = {"value":"Please leave a message."};
	// var choices = new tropo.Choices("[5 DIGITS]");
	var choices = {"terminator":"#"};
	var transcription = {"id":"1234", "url":"mailto:chris@matthieu.us"}

    //function(attempts, bargein, beep, choices, format, maxSilence, maxTime, method, minConfidence, name, required, say, timeout, transcription, url, password, username)
    //tropo.record(null, null, true, choices, 'audio/wav', 7, 60, null, null, "recording", null, say, 10, transcription, "http://104.236.191.100/binwww/test.wav", enjoy123, root);
    

    res.send(tropoapi.TropoJSON(tropo));
});

app.post('/audio', function(req, res){
	sys.puts('receiving transcription');
});

app.listen(80);
// console.log('Server running on http://0.0.0.0:8000/')
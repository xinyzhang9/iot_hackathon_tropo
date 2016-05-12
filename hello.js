var speech = require("./speech");

var http = require('http');
var tropowebapi = require('tropo-webapi');
require('tropo-webapi/lib/tropo-session');
var util = require('util');



var express = require('express');
var app = express();
var sys = require('util');
var bodyParser = require('body-parser');
var path = require('path');

app.use(bodyParser.urlencoded({'extended' : 'true'}));
app.use(bodyParser.json());

app.set('views',path.join(__dirname,'./views'));
app.set('view engine','ejs');

var multer  = require('multer');

var language = 'TBD';

//var lan = 'en-US';

var storage = multer.diskStorage({
	destination: './',
	filename: function(req, res, cb){
	   cb(null, stringGen(4) + '.wav');
	}
});

function stringGen(len)
{
 var text = "";
 var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 for( var i=0; i < len; i++ )
   text += charset.charAt(Math.floor(Math.random() * charset.length));
 return text;
}


var type = multer({ storage: storage }).single('filename');

// var server = http.createServer(function (request, response) {
    
//     // Create a new instance of the TropoWebAPI object.
//     var tropo = new tropowebapi.TropoWebAPI();
//     tropo.say("Hello, World!");
    
//     // Render out the JSON for Tropo to consume.
//     response.writeHead(200, {'Content-Type': 'application/json'});
//     response.end(tropowebapi.TropoJSON(tropo));

// }).listen(80); // Listen on port 80 for requests.

// var server = http.createServer(function (request, response) {
    
//     // Create a new instance of the TropoWebAPI object.
//     var tropo = new tropowebapi.TropoWebAPI();


//     // Demonstrates how to use the base Tropo action classes.

//     var say = new Say("Please ree cord your message after the beep.");

//     var choices = new Choices(null, null, "#");

 

//     // Action classes can be passed as parameters to TropoWebAPI class methods.

//     // use the record method https://www.tropo.com/docs/webapi/record.htm

//     tropo.record(3, false, null, choices, "audio/wav", 5, 60, null, null, "recording", null, say, 5, null, "http://104.263.191.100/binwww/test.wav", "enjoy123", "root");


//     // use the on method https://www.tropo.com/docs/webapi/on.htm

//     tropo.on("continue", null, "/answer", true);

 

//     tropo.on("incomplete", null, "/timeout", true);

     

//     tropo.on("error", null, "/error", true);


//     // response.send(TropoJSON(tropo));

    
//     // Render out the JSON for Tropo to consume.
//     response.writeHead(200, {'Content-Type': 'application/json'});
//     response.end(tropowebapi.TropoJSON(tropo));

// }).listen(80); // Listen on port 80 for requests.

app.get("/result", function(req,res){

	res.render('result',{ens: language});

});


app.post('/', function(req, res){
    // Create a new instance of the TropoWebAPI object.
    console.log("HERE!");
    console.log(req.body);

    language = JSON.stringify(req.body);


    var token = '7973744178676e525276655149704e51536a5873704b674f565757474d41746e64556b706a554a7667437a66';

    var params = {
   'src': '16622695772', // Sender's phone number with country code
   'dst' : '+12177214157', // Receiver's phone Number with country code
   'text' : "Thanks for your query. Your language identified is " + language, // Your SMS Text Message - English
   //'text' : "こんにちは、元気ですか？", // Your SMS Text Message - Japanese
   //'text' : "Ce est texte généré aléatoirement", // Your SMS Text Message - French
   //'url' : "http://example.com/report/", // The URL to which with the status of the message is sent
   'method' : "GET" // The method used to call the url
	};

	// Prints the complete response
	p.send_message(params, function (status, response) {
	   console.log('Status: ', status);
	   console.log('API Response:\n', response);
	   console.log('Message UUID:\n', response['message_uuid']);
	   console.log('Api ID:\n', response['api_id']);
	});

    //var tropo = new tropowebapi.TropoWebAPI();

    //console.log(req.body);
    // if(req.body['session']['from']['channel'] == "TEXT") {
    // 	console.log("if");
    //     tropo.say("This application is voice only.  Please call in using a regular phone or SIP phone.");
        
    //     tropo.on("continue", null, null, true);
        
    //     res.send(TropoJSON(tropo));
    // }    // Use the say method https://www.tropo.com/docs/webapi/say.htm
    // else {
//    	console.log("else");

    res.render('result',{ens : language});
    //console.log(req.body);
//}
});


app.post('/record', type, function(req,res) {
	console.log(req.body);

	console.log(req.file);
	var filename = req.file.filename;
	//call translate
	setTimeout(function(){speech(filename)},2000);

	
	// var tropo = new TropoWebAPI();

	// tropo.say("Your language is english");

	// res.send(TropoJSON(tropo));	

});


// app.post('/record',function(req,res){
// 	console.log("here");
//     // parse a file upload
//     var form = new multiparty.Form();

//     form.parse(req, function(err, fields, files) {
//     	console.log(files);
//       res.writeHead(200, {'content-type': 'text/plain'});
//       res.write('received upload:\n\n');
//       res.end(util.inspect({fields: fields, files: files}));
//       console.log("success");

//     });
// });

var plivo = require('plivo');
var p = plivo.RestAPI({
 authId: 'MAYZJINJK1YJJJZMFMMZ',
 authToken: 'YmU2YzQ3ZDZkMjhjYTFmMjRkYmEwNDQ3OWM0NmVj'
});


app.post('/answer', function(req, res){
    // Create a new instance of the TropoWebAPI object.
    var tropo = new tropowebapi.TropoWebAPI();
    tropo.say("Recording successfully saved.  Thank you!");

    res.send(TropoJSON(tropo));
});

app.post('/timeout', function(req, res){
    var tropo = new tropowebapi.TropoWebAPI();
    tropo.say("Sorry, I didn't hear anything.  Please call back and try again.");

    res.send(TropoJSON(tropo));
});

app.post('/error', function(req, res){
    // Create a new instance of the TropoWebAPI object.
    var tropo = new tropowebapi.TropoWebAPI();
    tropo.say("Recording failed.  Please call back and try again.");

    res.send(TropoJSON(tropo));
});

app.get('/',function(req,res){
	res.render('index');
})



app.listen(80);
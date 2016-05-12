var http = require('http');
var tropowebapi = require('tropo-webapi');

var express = require('express');
var app = express();
var sys = require('util');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({'extended' : 'true'}));
app.use(bodyParser.json());


var multer  = require('multer');

// var busboy = require('connect-busboy');

var multiparty = require('multiparty')
  , http = require('http')
  , util = require('util')


 var upload = multer({dest : 'upload/'});

 var type = upload.single('filename');

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

app.post('/', function(req, res){
    // Create a new instance of the TropoWebAPI object.
    console.log("post");
    //var tropo = new tropowebapi.TropoWebAPI();
    // if(req.body['session']['from']['channel'] == "TEXT") {
    // 	console.log("if");
    //     tropo.say("This application is voice only.  Please call in using a regular phone or SIP phone.");
        
    //     tropo.on("continue", null, null, true);
        
    //     res.send(TropoJSON(tropo));
    // }    // Use the say method https://www.tropo.com/docs/webapi/say.htm
    // else {
    	console.log("else");

    //tropo.say("Welcome to my Tropo Web API node demo.");
    
    //var say = new Say("Please ree cord your message after the beep.");
    //var choices = new Choices(null, null, "#");

    // tropo.record(3, false, null, choices, "audio/wav", 5, 60, null, null, "recording", null, say, 5, null, "http://104.236.191.100/", "enjoy123", "root");
    // tropo.record(3, false, null, choices, null, 5, 60, null, null, "recording", null, say, 5, null, "ftp://104.236.191.100/test.wav", "enjoy123", "root");
    //tropo.say("helloworld.wav");

    // // use the on method https://www.tropo.com/docs/webapi/on.htm
    // tropo.on("continue", null, "/answer", true);

    // tropo.on("incomplete", null, "/timeout", true);
    
    // tropo.on("error", null, "/error", true);

    //res.send(TropoJSON(tropo));
    console.log(req.body);
//}
});


app.post('/record', type, function(req,res) {

console.log(req.file);

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

// app.post('/record',function(req,res){
// 	console.log("thanks post");
// 	console.log(req.body);
// });

app.get('/record',function(req,res){
	console.log("thanks get");
});

app.listen(80);
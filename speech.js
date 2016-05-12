var fs = require('fs');
var util = require('util');
var request = require('request');

var clientId = 'app_xinyzhang9';                             // Can be anything
var clientSecret = 'afef7e827b6a445abf5707767900ad0b'; // API key from Azure marketplace

var str = 'This is a cool demo to call Microsoft text to speach service in Node.js.';

var langs = ['es-ES','zh-CN','de-DE'];

var finalRes = [];

console.log('Converting from text -> speech -> text.');
console.log('Input text: "' + str + '"');

getAccessToken(clientId, clientSecret, function(err, accessToken) {
  if(err) return console.log(err);
  console.log('Got access token: ' + accessToken)


  speechToText('houyan.wav', accessToken, langs[0], function(err, res) {
      // var x = i;
      if(err) return console.log(err);
      var newObj = {'Confidence' : res.results[0].confidence,
                    'Content' : res.results[0].lexical,
                    'lang' : langs[0],
                   };
      finalRes.push(newObj);
      // console.log('Confidence ' + res.results[0].confidence + ' for: "' + res.results[0].lexical + '"');
      if(finalRes.length === langs.length){
        console.log(finalRes);
      }
        
    });

  speechToText('houyan.wav', accessToken, langs[1], function(err, res) {
      // var x = i;
      if(err) return console.log(err);
      var newObj = {'Confidence' : res.results[0].confidence,
                    'Content' : res.results[0].lexical,
                    'lang' : langs[1],
                   };
      finalRes.push(newObj);
      // console.log('Confidence ' + res.results[0].confidence + ' for: "' + res.results[0].lexical + '"');
      if(finalRes.length === langs.length){
        console.log(finalRes);
      }
        
    });

  speechToText('houyan.wav', accessToken, langs[2], function(err, res) {
      // var x = i;
      if(err) return console.log(err);
      var newObj = {'Confidence' : res.results[0].confidence,
                    'Content' : res.results[0].lexical,
                    'lang' : langs[2],
                   };
      finalRes.push(newObj);
      // console.log('Confidence ' + res.results[0].confidence + ' for: "' + res.results[0].lexical + '"');
      if(finalRes.length === langs.length){
        console.log(finalRes);
      }
        
    });


  
})
// ==== Helpers ====

function getAccessToken(clientId, clientSecret, callback) {
  request.post({
    url: 'https://oxford-speech.cloudapp.net/token/issueToken',
    form: {
      'grant_type': 'client_credentials',
      'client_id': encodeURIComponent(clientId),
      'client_secret': encodeURIComponent(clientSecret),
      'scope': 'https://speech.platform.bing.com'
    }
  }, function(err, resp, body) {
    if(err) return callback(err);
    try {
      var accessToken = JSON.parse(body).access_token;
      if(accessToken) {
        callback(null, accessToken);
      } else {
        callback(body);
      }
    } catch(e) {
      callback(e);
    }
  });
}

function textToSpeech(text, filename, accessToken, callback) {
  var ssmlTemplate = "<speak version='1.0' xml:lang='en-us'><voice xml:lang='%s' xml:gender='%s' name='%s'>%s</voice></speak>";
  request.post({
    url: 'http://speech.platform.bing.com/synthesize',
    body: util.format(ssmlTemplate, 'en-US', 'Female', 'Microsoft Server Speech Text to Speech Voice (en-US, ZiraRUS)', text),
    encoding: null,
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type' : 'application/ssml+xml',
      'X-Microsoft-OutputFormat' : 'riff-16khz-16bit-mono-pcm',
      'X-Search-AppId': '07D3234E49CE426DAA29772419F436CA',
      'X-Search-ClientID': '1ECFAE91408841A480F00935DC390960',
    }
  }, function(err, resp, body) {
    if(err) return callback(err);
    fs.writeFile(filename, body, 'binary', function (err) {
      if (err) return callback(err);
      callback(null);
    });
  });
}

function speechToText(filename, accessToken, lang, callback) {
  fs.readFile(filename, function(err, waveData) {
    if(err) return callback(err);
    request.post({
      url: 'https://speech.platform.bing.com/recognize/query',
      qs: {
        'scenarios': 'ulm',
        'appid': 'D4D52672-91D7-4C74-8AD8-42B1D98141A5', // This magic value is required
        'locale': lang,
        'device.os': 'wp7',
        'version': '3.0',
        'format': 'json',
        'requestid': '1d4b6030-9099-11e0-91e4-0800200c9a66', // can be anything
        'instanceid': '1d4b6030-9099-11e0-91e4-0800200c9a66' // can be anything
      },
      body: waveData,
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'audio/wav; samplerate=16000',
        'Content-Length' : waveData.length
      }
    }, function(err, resp, body) {
      if(err) return callback(err);
      try {
        callback(null, JSON.parse(body));
      } catch(e) {
        callback(e);
      }
    });
  });
}


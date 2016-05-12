/**
 * Simple outbound message launcher in Node.js
 * 
 * You will need to have a Tropo scripting aplication set up
 *  to use this. See sample code below:
 *  
 *  message(msg, { to:number, network:"SMS" });
 *  
 *  Save this file in your Tropo account as message.js
 * 
 */
var http = require('http');
var sys = require('util');

// Enter your tropo outbound messaging token below.
var token = '6367574b6a486f504a5a424e6b55564a70484b55766c6c4a6d5a757a45597a4774754751746d556751664754';
var msg = encodeURI('This is a test SMS message from Node.js.');
var number = '17347470675';

var tropoSessionAPI = 'api.tropo.com';
var path = '/1.0/sessions?action=create&token=' + token + '&msg=' + msg + '&number=' + number;

var tropo = http.createClient(80, tropoSessionAPI);
var request = tropo.request('GET', path, {'host': tropoSessionAPI});

request.end();

request.on('response', function (response) {
  response.setEncoding('utf8');
  response.addListener('data', function (chunk) {
  sys.log('Sent message. Tropo response code:' + response.statusCode + '. Body: ' + chunk);
  });
});         
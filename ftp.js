var path = require('path');
var fs = require('fs');
// var Promise = require('bluebird');
var Client = require('ftp');

var c = new Client();

var connectionProperties = {
    host: "ftp://ftp.tropo.com/www/audio",
    user: "xinyzhang9@gmail.com",
    password: "Lynnzxy31415@",
};

c.on('ready', function () {
    console.log('ready');
    c.list(function (err, list) {
        if (err) console.log(err); //throw err;
        list.forEach(function (element, index, array) {
            //Ignore directories
            if (element.type === 'd') {
                console.log('ignoring directory ' + element.name);
                return;
            }
            //Ignore non zips
            if (path.extname(element.name) !== '.wav') {
                console.log('ignoring file ' + element.name);
                return;
            }
            //Download files
            c.get(element.name, function (err, stream) {
                if (err) throw err;
                stream.once('close', function () {
                    c.end();
                });
                stream.pipe(fs.createWriteStream(element.name));
            });
        });
    });
});

c.connect(connectionProperties);
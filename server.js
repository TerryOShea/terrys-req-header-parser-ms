var express = require('express');
var app = express();
var path = require('path');
var useragent = require('useragent');

app.get('/', function(req, res) {
    var fileName = path.join(__dirname, 'server.html');
    res.sendFile(fileName, function (err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        }
    })
    
    var ip = req.connection.remoteAddress;
    var lang = req.headers["accept-language"];
    var agent = useragent.parse(req.headers['user-agent']);

    res.json({
      ipaddress: ip, 
      language: lang,
      software: agent.os.toString()
    });
});

app.listen(process.env.PORT || 3500);
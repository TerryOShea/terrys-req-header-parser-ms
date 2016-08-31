var express = require('express');
var app = express();
var path = require('path');
var useragent = require('useragent');
var acceptLanguage = require('accept-language');

app.get('/', function(req, res) {
    var fileName = path.join(__dirname, 'server.html');
    res.sendFile(fileName, function (err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        }
    })
    
    var ip = req.headers['x-forwarded-for'];
    var lang = acceptLanguage.parse(req.headers['accept-language']);
    var agent = useragent.parse(req.headers['user-agent']);

    res.json({
      ipaddress: ip, 
      language: lang[0].value,
      software: agent.os.toString()
    });
});

app.listen(process.env.PORT || 3500);
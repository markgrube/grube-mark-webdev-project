var express = require('express');
var app = express();

// install, load, and configure body parser module
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

if(!process.env.GOOGLE_CLIENT_ID) {
    var env = require('../env')
}

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

require ("./project/app.js")(app);

app.set('ipaddress', (process.env.IP));
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), app.get('ipaddress'));
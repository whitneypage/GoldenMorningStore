'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var session = require('express-session');
var configDB = require('./config/database.js');
var port = 1337;

mongoose.connect(configDB.url);

app.use(bodyParser());
app.use(cors());
app.use(express.static(__dirname+'/public'));

require('./routes.js')(app, passport);

app.listen(port, function(){
	console.log('now listening on port ' + port);
});
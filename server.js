'use strict';

var express = require('express');
var app = express();
var routes = require('./routes');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var configDB = require('./apis/config/database.js');
var session = require('express-session');
var fs = require('fs');
var productsCtrl = require('./apis/controllers/productsCtrl');

// var routes = require('./routes');
// var configJSON = fs.readFileSync(__dirname + "/apis/config/config.json");
// var paypalConfig = JSON.parse(configJSON.toString());

var port = 1337;

mongoose.connect('mongodb://localhost:27017/GoldenMorningStore');

try {
  var configJSON = fs.readFileSync(__dirname + "/apis/config/config.json");
  var paypalConfig = JSON.parse(configJSON.toString());

} catch (e) {
  console.error("File config.json not found or is invalid: " + e.message);
  process.exit(1);
}
routes.init(paypalConfig);

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname+'/public'));



routes.app(app);

app.listen(port, function(){
	console.log('now listening on port ' + port);
});
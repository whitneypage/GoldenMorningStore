'use strict';

var express = require('express');
var app = express();

var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var session = require('express-session');
var productsCtrl = require('./apis/controllers/productsCtrl')
var configDB = require('./apis/config/database.js');
var port = 1337;

console.log('configDB.url', configDB.url)
mongoose.connect('mongodb://localhost:27017/GoldenMorningStore');

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname+'/public'));

// app.get('/getProduct', function(req, res){
// 	console.log("In node getProduct method");
// 	res.json({
// 		"productItems":[
// 		    {
// 		        "productTitle": "Beauty Shirt",
// 		        "productDescription": "This is a high class beautiful shirt.",
// 		        "productCategory": "Shirts",
// 		        "image": "http://blahblah.com",
// 		        "color": "Blue",
// 		        "size": "Medium",
// 		        "price": "35"
// 		    }
// 	    ]
// 	});
// });

// app.post('/addProduct', function(req, res){
// 	console.log("In node addProduct method");
// });

require('./routes.js')(app);

app.listen(port, function(){
	console.log('now listening on port ' + port);
});
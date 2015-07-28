var cartCtrl = require('./apis/controllers/cartCtrl');
var orderCtrl = require('./apis/controllers/orderCtrl');
var productsCtrl = require('./apis/controllers/productsCtrl.js');
var userCtrl = require('./apis/controllers/userCtrl');
var express = require('express');


var app = express.Router();

module.exports = function(app){

		// Add Product Modal FrontEnd EndPoints
	// app.post('/addProduct', productsCtrl.create);
	// app.get('/getProduct', productsCtrl.retrieve);
	app.get('/api/products', productsCtrl.get);
	app.post('/api/products', productsCtrl.post);
	app.put('/api/products', productsCtrl.put);
	app.delete('/api/products', productsCtrl.delete);

	
	
}
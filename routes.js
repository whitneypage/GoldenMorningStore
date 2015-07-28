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
	app.get('/api/products', productsCtrl.handleGet);
	app.post('/api/products', productsCtrl.handlePost);
	app.put('/api/products', productsCtrl.handlePut);
	app.delete('/api/products', productsCtrl.handleDelete);

	app.post('/user/cart', cartCtrl.addProductToCart);
	app.get('/user/cart', cartCtrl.getCart);
	app.put('/user/cart', cartCtrl.removeProductFromCart);

	app.post('/user/order', orderCtrl.createOrder);
	app.get('/admin/order', orderCtrl.getOrder);
	app.put('/admin/order', orderCtrl.updateOrder);
}
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

	app.post('/api/user/cart', cartCtrl.addProductToCart);
	app.get('/api/user/cart', cartCtrl.getCart);
	app.put('/api/user/cart/:id', cartCtrl.removeProductFromCart);

	app.post('/api/user/order', orderCtrl.createOrder);
	app.get('/api/admin/order/:id', orderCtrl.getOrder);
	app.get('/api/admin/orders', orderCtrl.getOrders);
	app.put('/api/admin/order/:id', orderCtrl.updateOrder);
};
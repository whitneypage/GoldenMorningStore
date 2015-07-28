var cartCtrl = require('./apis/controllers/cartCtrl');
var orderCtrl = require('./apis/controllers/orderCtrl');
var productsCtrl = require('./apis/controllers/productsCtrl');
var userCtrl = require('./apis/controllers/userCtrl');
var express = require('express');


var app = express.Router();

module.exports = function(app){

		// Add Product Modal FrontEnd EndPoints
	app.post('/admin/product', productsCtrl.create);
	app.get('/admin/product', productsCtrl.retrieve);
	app.put('/admin/product:product_id', productsCtrl.update);
	app.delete('/admin/product:product_id', productsCtrl.remove);

	app.post('/user/cart', cartCtrl.addProductToCart);
	app.get('/user/cart', cartCtrl.getCart);
	app.put('/user/cart', cartCtrl.removeProductFromCart);

	app.post('/user/order', orderCtrl.createOrder);
	app.get('/admin/order', orderCtrl.getOrder);
	app.put('/admin/order', orderCtrl.updateOrder);
}
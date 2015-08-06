var cartCtrl = require('./apis/controllers/cartCtrl');
var orderCtrl = require('./apis/controllers/orderCtrl');
var productsCtrl = require('./apis/controllers/productsCtrl');
var userCtrl = require('./apis/controllers/userCtrl');
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var session = require('express-session');
var User = require('./apis/models/userSchema');
var paypal = require('paypal-rest-sdk');
var AWS = require('aws-sdk');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require('fs');
var config = require('./apis/config/keys');


var app = express.Router();

exports.init = function(c){
	config = c;
	paypal.configure(c.api);
};

exports.app = function(app){


function cart(req, res, next){
	if(!req.session.cart){
		req.session.cart = [];
		next();
	}
next();
};

function isAdmin(req, res, next){
	if(req.user){return next()}
	else {
    res.status(500).send('not an admin')
  }
};



app.use(passport.initialize());
app.use(passport.session());
app.use(session({
   secret: process.env.SESSION_SECRET || "goldmorningshopsecret",
   resave: false,
   saveUninitialized: true }));

passport.use(new LocalStrategy(
	function(username, password, done) {
		User.findOne({ email: username }, function(err, user) {
			if(err) {return done(err); }
			if(!user) {
				return done(null, false, {message: 'Incorrect username.'});
			}
			if(!user.validPassword(password)) {
				return done(null, false, {message: 'Incorrect username.'});
			}
		return done(null, user);
		});
	}
));

passport.serializeUser(function(user, done) {
   done(null, user);
});
passport.deserializeUser(function(obj, done) {
   done(null, obj);
});

	app.post('/api/upload', multipartMiddleware, productsCtrl.uploadPhoto);
	app.get('/api/upload', productsCtrl.addPicturesGet);
  app.post('/api/colorSize', productsCtrl.updateColorSize)
	// app.post('/api/upload', productsCtrl.uploadPhoto)
  app.post('/api/admin', userCtrl.createAdmin);
  // app.get('/api/products/image', productsCtrl.uploadImage)
	app.get('/api/products', productsCtrl.handleGetAll);
	app.get('/api/products/:productId', productsCtrl.handleGetOneProduct);
	app.post('/api/products', productsCtrl.handlePost);
	app.put('/api/products/:productId', productsCtrl.handlePut);
	app.put('/api/products', productsCtrl.decSize);
	app.delete('/api/products/:productId', productsCtrl.handleDelete);
  
  app.get('/api/paypal/', orderCtrl.pmtExecute);
	app.post('/api/paypal', orderCtrl.pmtCreate);
	app.post('/api/user/cart', cart, cartCtrl.addProductToCart);
	app.get('/api/user/cart', cart, cartCtrl.getCart);
	app.put('/api/user/cart/:id', cart, cartCtrl.removeProductFromCart);

	app.post('/api/user/order', orderCtrl.createOrder);
	app.get('/api/admin/order/:id', orderCtrl.getOrder);

	app.get('/api/admin/orders', orderCtrl.getAllOrders);
	app.put('/api/admin/order/:id', orderCtrl.updateOrder);
 

};

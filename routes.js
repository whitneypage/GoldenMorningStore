var cartCtrl = require('./apis/controllers/cartCtrl');
var orderCtrl = require('./apis/controllers/orderCtrl');
var productsCtrl = require('./apis/controllers/productsCtrl.js');
var userCtrl = require('./apis/controllers/userCtrl');
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var session = require('express-session');
var User = require('./apis/models/userSchema');




var app = express.Router();

module.exports = function(app){

function isAdmin(req, res, next){
	if(req.user){return next()}
	else {
    res.status(500).send('not an admin')
  }
}

app.use(passport.initialize());
app.use(passport.session());
app.use(session({
	secret: 'my cat can eat a whole watermelon'
}));

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
})
passport.deserializeUser(function(obj, done) {
   done(null, obj);
})

		// Add Product Modal FrontEnd EndPoints
	// app.post('/addProduct', productsCtrl.create);
	// app.get('/getProduct', productsCtrl.retrieve);
	app.get('/api/products', productsCtrl.get);
	app.post('/api/products',isAdmin, productsCtrl.post);
	app.put('/api/products',isAdmin, productsCtrl.put);
	app.delete('/api/products',isAdmin, productsCtrl.delete);

	app.post('/user/cart', cartCtrl.addProductToCart);
	app.get('/user/cart', cartCtrl.getCart);
	app.put('/user/cart', cartCtrl.removeProductFromCart);

	app.post('/user/order', orderCtrl.createOrder);
	app.get('/admin/order', orderCtrl.getOrder);
	app.put('/admin/order', orderCtrl.updateOrder);
}
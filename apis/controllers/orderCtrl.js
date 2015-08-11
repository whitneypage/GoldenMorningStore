var Order = require('../models/orderSchema');
var Product = require('../models/productsSchema');
var Paypal = require('paypal-rest-sdk');
var session = require('express-session');
var configAuth = require('../config/keys');
var sendgrid = require('sendgrid')(configAuth.sendGridAuth.apiKey);

module.exports = {

	/*to be invoked when a customer has purchased the products in their cart*/
	createOrder: function(req, res) {
		console.log(1111, req.body);
		new Order(req.body)
		.save(function(err, data) {
			if(err) {
				console.log(err);
				res.status(500).send(err);
			}
			res.send(data);
		})
	}

	, getOrder: function(req, res) {
		Order.findById(req.params.id)
		.populate('products.product')
		.exec(function(err, data) {
			if(err) {
				res.error(500).send(err);
			}
			else {
				res.send(data);
			}
		})
	}

	, getAllOrders: function(req, res) {
		Order.find({})
		.populate('products.product')
		.exec(function(err, result) {
			if(err) {
				res.status(500).json(err);
			}
			return res.json(result);
		})
	}

	/*not sure exactly what this method will be for nor how it will be used...yet*/
	, updateOrder: function(req, res) {
		console.log('THIS IS IMPORTANT TO ME:   ', req.body, 'THIS IS IMPORTANT TOO:  ', req.params)
		Order.findByIdAndUpdate(req.params.id, req.body, {new: true},  function(err, data) {
			if(err) {
				res.status(500).send(err);
				console.log(err);
			} else {

				//email upon order status update - shipped
			var email     = new sendgrid.Email({
				to:       'tylertebbs20@gmail.com',
				from:     'tylertebbs20@yahoo.com',
				subject:  'Congrats, your item has been shipped',
				text:     'Hello myself'
			});
			sendgrid.send(email, function(err, json) {
				if (err) { return console.error(err); }
				console.log(json);
			});

				//end email upon order status update -shipped



			}
			res.send(data);
		})
	}

	, updateOrderByPaymentId: function(req, res){
		var PayerID = {payer_id: req.body.PayerID};
		Paypal.payment.execute(req.params.id, PayerID, function(error, payment){
		  if(error){
		    console.error(error);
		  } else {

		  	//email upon order
			var email     = new sendgrid.Email({
				to:       'tylertebbs20@gmail.com',
				from:     'tylertebbs20@yahoo.com',
				subject:  'Congrats, someone just made an order',
				text:     'Hello myself'
			});
			sendgrid.send(email, function(err, json) {
				if (err) { return console.error(err); }
				console.log(json);
			});
		  	// end email upon order

		  	var cust = payment.payer.payer_info;
		  	var orderObj = {
		  		customer: {
		  			name: {
		  				first: cust.first_name,
		  				last: cust.last_name
		  			},
		  			email: cust.email,
		  			payerId: cust.payer_id,
		  			shippingAddress: {
		  				street: cust.shipping_address.line1,
		  				city: cust.shipping_address.city,
		  				state: cust.shipping_address.state,
		  				zip: cust.shipping_address.postal_code,
		  				country: cust.shipping_address.country_code
		  			}
		  		}
		  	};
				Order.findOneAndUpdate(req.query.id, orderObj, function(err, data){
					if(err) {
						res.status(500).send(err);
						console.log(err);
					}
					res.json(data);
				})
		  }
		});
	}

	, pmtCreate: function(req, res) {
			Paypal.payment.create(req.body.payment, function (error, payment) {
	  if (error) {
	    console.log(error.response.details);
	  } else {
	  	console.log('PAYMENT', payment);
	    res.json(payment)
		}
	});
}

, successGet: function(req, res){
		var payerId = req.params.id;
		Paypal.payment.get(payerId, function(error, payerInfo){
			  if(error){
			    console.error(error);
			  } else {
			    console.log('payerInfo', payerInfo);
			  	res.json(payerInfo)
			  }
		});
}

};
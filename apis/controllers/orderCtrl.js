var Order = require('../models/orderSchema');
var Product = require('../models/productsSchema');
var Paypal = require('paypal-rest-sdk');
var session = require('express-session');

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
		Order.findByIdAndUpdate(req.params.id, req.body, function(err, data) {
			if(err) {
				res.status(500).send(err);
				console.log(err);
			}
			res.send(data);
		})
	}

	, pmtCreate: function(req, res) {
			Paypal.payment.create(req.body.payment, function (error, payment) {
	  if (error) {
	    console.log(error);
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


	, pmtExecute: function(req, res){
		// var paymentId = session.payment.id;
	 //  var payerId = req.params.payerId;
		// console.log('pmt EXECUTE!!!', 'paymentId', paymentId, 'payerId', payerId)

	  var details = { "payer_id": "EC-6XD92317T3033605D" };
	  console.log("DETAILS", details)
	  Paypal.payment.execute("PAY-7AS67526M92359017KXBNQKA", details, function (error, payment) {
	    if (error) {
	      console.log(error);
	    } else {
	      res.send("Hell yeah!");
	    }
	  });
	}

};
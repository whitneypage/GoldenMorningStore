var Order = require('../models/orderSchema');
var Product = require('../models/productsSchema');
var Paypal = require('paypal-rest-sdk');
var session = require('express-session');

module.exports = {

	/*to be invoked when a customer has purchased the products in their cart*/
	createOrder: function(req, res) {
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
		Order.find(req.query)
		/*the line below should be changed later*/
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
		Palette.find({})
		.populate('orders')
		.exec(function(err, result) {
			if(err) {
				res.status(500).json(err);
			}
			return res.json(result);
		})
	}

	/*not sure exactly what this method will be for nor how it will be used...yet*/
	, updateOrder: function(req, res) {
		Order.findByIdAndUpdate(req.query._id, req.body, function(err, data) {
			if(err) {
				res.status(500).send(err);
				console.log(err);
			}
			res.send(data);
		})
	}

	, pmtCreate: function(req, res) {
		// console.log("req.body", req.body)
			Paypal.payment.create(req.body.payment, function (error, payment) {
	  if (error) {
	    console.log(error);
	  } else {
	    if(payment.payer.payment_method === 'paypal') {
	      var redirectUrl;
	      for(var i=0; i < payment.links.length; i++) {
	        var link = payment.links[i];
	        if (link.method === 'REDIRECT') {
	          redirectUrl = link.href;
	        }
	        // console.log('232434343434343434343434343')
	        // res.redirect(redirectUrl);
	      }
	    }
	    session.payment = payment;
	    res.json(payment)
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
var Order = require('../models/orderSchema');
var Product = require('../models/productsSchema');

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

};
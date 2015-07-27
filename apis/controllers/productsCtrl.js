var mongoose = require('mongoose');
var Product = mongoose.model('Product', require('../models/productsSchema.js'));

module.exports = {
	create: function(req, res) {
		Product.create({
			
		})
	}
};
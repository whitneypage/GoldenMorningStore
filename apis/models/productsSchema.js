var mongoose = require('mongoose');


var productSchema = mongoose.Schema({
    productTitle: {type: String} 
	, productDescription: {type: String}
	, productCategory: {type: String}
	, image: {type: String}
	, price: {type: Number}
	, dateUpdated: {type: Date}
	, colorSize: [{
	  color: {type: String} ,
	  smallQty: {type: Number},
		mediumQty: {type: Number},
		largeQty: {type: Number}
  }]

});

productSchema.pre('createProduct', function(){
		this.dateCreated = Date.now();
});

module.exports = mongoose.model('Product', productSchema);

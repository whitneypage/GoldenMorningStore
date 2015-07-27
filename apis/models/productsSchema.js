var mongoose = require('mongoose');


var productSchema = mongoose.Schema({
	sku: {type: Number}
	, productTitleField: {type: String} 
	, productDescriptionField: {type: String}
	, chooseProductCategory: {type: String}
	, imageField: {type: String}
	, addPriceField: {type: Number}
	, dateCreated: {type: Date}
	, dateUpdated: {type: Date}
	, colorSize: {
		color: {type: String}, 
		sizes: [{
			smallQty: {type: Number},
			mediumQty: {type: Number},
			largeQty: {type: Number}
		}]

	}

})

productSchema.pre('createProduct', function(){
		this.dateCreated = Date.now();
})


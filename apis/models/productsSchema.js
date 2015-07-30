var mongoose = require('mongoose');


var productSchema = mongoose.Schema({
    productTitle: {type: String} 
	, productDescription: {type: String}
	, productCategory: {type: String}
	, images: [{type: String}]
	, price: {type: Number}
	, dateUpdated: {type: Date}
	, colorSize: [{
	color: {type: String} 
	, smallQty: {type: Number}
	, mediumQty: {type: Number}
	, largeQty: {type: Number}
	, mainImg: {type: String}
  }]

});

/*productSchema.pre('save', function(){
		this.dateCreated = Date.now();
});*/

module.exports = mongoose.model('Product', productSchema);

var mongoose = require('mongoose');

var productsSchema = mongoose.Schema({
    nameAndColor: 
    category: 
    price: 
    sizes: 
    photos: 
    description: 
    dateCreated:
    /*so the lady can see when she most recently updated a given product*/
    dateUpdated:
})

productsSchema.pre('update', function() {
    this.dateUp
})

module.exports = mongoose.model("Product", productsSchema);
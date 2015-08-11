var mongoose = require('mongoose');
var customerSchema = require('./customerSchema');

var orderSchema = mongoose.Schema({
    user: {type: String}, 
    products: [{
        product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}
        , size: {type: String}
        , color: {type: String}
        , colorSizeId: {type: String}
    }]
    , total: {type: Number}
    , status: {type: String, enum: ['approved', 'pending', 'shipped', 'delivered', 'on hold', 'canceled'], default: 'pending'}
    , timePlaced: {type: Date}
    , shippingDate: {type: Date}
    , note: {type: String}
    , paymentId: {type: String}
    , customer: [customerSchema]
});

orderSchema.pre('save', function(next) {
    var order = this;
    order.timePlaced = Date.now();
    next();
})


module.exports = mongoose.model("Order", orderSchema);
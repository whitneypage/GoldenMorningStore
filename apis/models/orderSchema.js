var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    user: {type: String}, 
    products: [{
        product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}
        , size: {type: String}
        , color: {type: String}
        , colorSizeId: {type: String}
    }]
    , total: {type: Number}
    , status: {type: String, enum: ['purchased', 'shipped', 'delivered', 'on hold', 'canceled'], default: 'purchased'}
    , timePlaced: {type: Date}
    , shippingDate: {type: Date}
    , note: {type: String}
});

orderSchema.pre('save', function(next) {
    var order = this;
    order.timePlaced = Date.now();
    next();
})


module.exports = mongoose.model("Order", orderSchema);
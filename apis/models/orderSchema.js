var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    , products: [{
        product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}
        , size: {type: String}
        , colorSizeId: {type: String}
    }]
    , total: {type: Number}
    , status: {type: String, enum: ['purchased', 'shipped', 'delivered', 'on hold', 'canceled'], default: 'purchased'}
    , timePlaced: {type: Date}
    , shippingDate: {type: Date}
    , note: {type: String}
});




module.exports = mongoose.model("Order", orderSchema);
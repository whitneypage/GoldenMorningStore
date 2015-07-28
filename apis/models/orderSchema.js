var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
    , products: [{
        product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true}
        , color: {type: String}
        , size: {type: String}
    }]
    , total: {type: Number, required: true}
    /*, address: address*/
    /*I feel like we'll want something here to let her know whether credit cards have been processed*/
    , payment: {type: String, enum: ['processing', 'paid'], default: 'processing'}
    , status: {type: String, enum: ['purchased', 'shipped', 'delivered', 'on hold', 'canceled'], default: 'purchased'}
    , timePlaced: {type: Date}
});

orderSchema.pre('createOrder', function() {
    this.timePlaced = Date.now();
})


module.exports = mongoose.model("Order", orderSchema);
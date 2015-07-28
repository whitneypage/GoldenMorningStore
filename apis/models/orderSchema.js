var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
//     user: {
//         name: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
//         {email: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
//     }
//     , products: [{
//         product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true}
//         do we want to have the following?
//         , photo: {type: mongoose.Schema.Types.ObjectId.photos[0], ref: 'Product', required: true}
//         , size: {type: String}
//         , price: {type: Number, min: 0.01, max: 100000, required: true}
//         we don't want "quantity" as a property here, right?
//     }]
//     , total: {type: Number, required: true}
//     , address: address, 
//     I feel like we'll want something here to let her know whether credit cards have been processed
//     , payment: {type: String, enum: ['processing', 'paid'], default: 'processing'}
//     , status: {type: String, enum: ['purchased', 'shipped', 'delivered', 'on hold', 'canceled'], default: 'purchased'}
//     , timePlaced: {type: Date}
// });

// orderSchema.pre('createOrder', function() {
//     this.timePlaced = Date.now();
})


module.exports = mongoose.model("Order", orderSchema);
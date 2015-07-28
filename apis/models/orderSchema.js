var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({


module.exports = mongoose.model("Order", orderSchema);
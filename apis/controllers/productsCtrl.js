var mongoose = require('mongoose');
var Product = require('../models/productsSchema.js');

module.exports = {
   handleGetAll: function(req, res) {
    Product.find({}, function(err, response) {
           if (err) {
               res.status(500).json(err);
           } else {
               res.json(response);
           }
       })
   },

   handlePost: function(req, res) {
       Product.create(req.body, function(error, response) {
           if (error) {
               return res.status(500).json(error);
           } else {
            console.log("new Product", response);
               return res.json(response);
           }
       });
   },

   handlePut: function(req, res) {
       Product.update(req.query, req.body, function(error, response) {
           if (error) {
               return res.status(500).json(error);
           } else {
               return res.json(response);
           }
       });
   },

   handleDelete: function(req, res) {
       Product.findByIdAndRemove(req.params.productId, function(error, response) {
           if (error) {
               return res.status(500).json(error);
           } else {
               return res.json(response);
           }
       });
   }

}
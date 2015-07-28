var mongoose = require('mongoose');
var Product = require('../models/productsSchema.js');
var AWS = require('aws-sdk');
var config = require('../config/auth');
var fs = require('fs');
var photBucket = new AWS.S3({params: {Bucket: 'goldmorning'}});

AWS.config.accessKeyId = config.AWSAdmin.accessKeyId;
AWS.config.secretAccessKey = config.AWSAdmin.secretAccessKey;
AWS.config.region = 'us-west-2';

module.exports = {


   handleGet: function(req, res) {

       Product.find(req.query, function(err, response) {
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
       Product.remove(req.query, function(error, response) {
           if (error) {
               return res.status(500).json(error);
           } else {
               return res.json(response);
           }
       });
   },

   uploadPhoto: function(req, res) {
    var file = req.files.file
      if(ACCESS_CONTROL_ALLOW_ORIGIN) {
        res.header("Access-Control-Allow-Origin", "*");
      }

      var s3_filename = file.name;
      var s3_bucket_name = 'goldmorning';
      var s3bucket = new AWS.S3();
      
      fs.readFile(file.ws.path, function(error, file_buffer) {
        if (error) {
               return res.status(500).json(error);
           } else {
               return res.json(file_buffer);
           }
      })

      var params = {
        Bucket: s3_bucket_name,
        Key: s3_filename,
        Body: file_buffer,
        ACL: 'public-read',
        ContentType: file.type
      }

      s3bucket.putObject(params, function(error, response) {
        if (error) {
               return res.status(500).json(error);
           }
        var update = {
          $push: {'pictures_array': {
            name: s3_filename,
            src: 'https://s3.amaonaws.com/'+s3_bucket_name+'/'+s3_filename
          }}
        };
        var options = {new: true};

        Product.findByIdAndUpdate(req.params.id, update, options, function(error, response) {
          if (error) {
               return res.status(500).json(error);
           } else {
               return res.json(response);
           }
        })
      })

    // var buf = new Buffer(req.body.image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    // var file = req.body.file;
    // photoBucket.upload({
    //   ACL: 'public-read',
    //   Body: buf,
    //   Key: file.name,
    //   ContentType: file.type
    // }), function(error, response) {
    //    if (error) {
    //        return res.status(500).json(error);
    //    } else {
    //        return res.json(response);
    //    }
    //  };
   }

  

}
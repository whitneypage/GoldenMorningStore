var mongoose = require('mongoose');
var Product = require('../models/productsSchema.js');
var AWS = require('aws-sdk');
var config = require('../config/keys');
var fs = require('fs');
var photBucket = new AWS.S3({params: {Bucket: 'goldmorning'}});
console.log(55555, config)
// AWS.config.accessKeyId = config.AWSAdmin.accessKeyID;
// AWS.config.secretAccessKey = config.AWSAdmin.SecretAccessKey;
// AWS.config.region = 'us-west-2';

AWS.config.update({
  accessKeyId: config.AWSAdmin.accessKeyID,
  secretAccessKey: config.AWSAdmin.SecretAccessKey,
  region: 'us-west-2'
});

var ACCESS_CONTROL_ALLOW_ORIGIN = false;

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
    console.log(111, req.body);
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
       Product.findByIdAndUpdate(req.params.productId, req.body, {new: true}, function(error, response) {
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
   },

   addPicturesGet: function(req, res) {
    flow.get(req, function(status, filename, original_filename, identifier) {
      console.log('GET', status);
      if (ACCESS_CONTROL_ALLOW_ORIGIN) {
        res.header("Access-Control-Allow-Origin", "*");
      }

      if (status == 'found') {
        status = 200;
      } else {
        status = 204;
      }

      res.status(status).send();
    });
  },

   uploadPhoto: function(req, res) {
    console.log('req.files', req.files)
    var file = req.files.file
      if(ACCESS_CONTROL_ALLOW_ORIGIN) {
        res.header("Access-Control-Allow-Origin", "*");
      }

      var s3_filename = file.name;
      var s3_bucket_name = 'goldmorning';
      var s3bucket = new AWS.S3();
      
      fs.readFile(file.path, function(error, file_buffer) {
        if (error) {
          return res.status(500).json(error);
        } else {
          console.log(22222, file_buffer);
          var params = {
            Bucket: s3_bucket_name,
            Key: s3_filename,
            Body: file_buffer,
            ACL: 'public-read',
            ContentType: file.type
          }

          s3bucket.putObject(params, function(error, response) {
            if (error) {
              console.log(3333, error)
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
          
          // return res.json(file_buffer);
        }
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
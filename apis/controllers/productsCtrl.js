var mongoose = require('mongoose');
var Product = require('../models/productsSchema.js');
var AWS = require('aws-sdk');
var config = require('../config/keys');
var fs = require('fs');
var photBucket = new AWS.S3({params: {Bucket: 'goldmorning'}});

AWS.config.update({
  accessKeyId: config.AWSAdmin.AccessKeyID,
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
       });
   },
	
	handleGetOneProduct :function(req, res) {
  	Product.findById( req.params.productId,
    function(err, response){
    	if (err) {
    		res.status(500).json(err);
    	} else {
    		console.log(response);
    		res.json(response);
    	}
    });
  },// end handleGetOneProduct

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
       Product.findByIdAndUpdate(req.params.productId, {$set :{
				 dateCreated : req.body.dateCreated,
				 productTitle : req.body.product.productTitle,
				 productDescription : req.body.product.productDescription,
				 productCategory : req.body.product.productCategory,
				 images : req.body.product.images,
				 price : req.body.product.price,
				 colorSize : req.body.product.colorSize
			 }}, {new: true}, function(error, response) {
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
	
		decSize: function(req,res) {
			var sizeToDec = req.body.sizeToDec;
			Product.findById(req.body.productId, function(err, response) {
				if(err) {
					return res.status(500).json(err);
				} if(response) {
					for(var i = 0; i < response.colorSize.length; i ++) {
						if(parseInt(response.colorSize[i]._id, 16) === parseInt(req.body.colorSizeId, 16)) {
							response.colorSize[i][sizeToDec] = response.colorSize[i][sizeToDec] - 1;
							response.save(function(err) {
								if (err) {console.log(err, 'err from within response.save');}
							})
							console.log(response.colorSize[i][sizeToDec], sizeToDec, ' new qty');
							res.send(response);
						}
					}
				}
			});
		},//end decSize 

		

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
            } else {
              return {src: 'https://s3.amaonaws.com/'+s3_bucket_name+'/'+s3_filename}
            }
          })
        }
      })
   },

};

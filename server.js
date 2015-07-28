'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var session = require('express-session');
var productsCtrl = require('./apis/controllers/productsCtrl')
var configDB = require('./apis/config/database.js');
var AWS = require('aws-sdk');
var AWSAuth = require('./apis/config/auth');
var fs = require('fs');
var port = 1337;

console.log('configDB.url', configDB.url)
mongoose.connect('mongodb://localhost:27017/GoldenMorningStore');


app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname+'/public'));

var s3bucket = new AWS.S3({params: {Bucket: 'goldmorning'}});


  // for creating a new bucket on the fly
// s3bucket.createBucket(function() {
//   var params = {Key: s3Key.AccessKeyID, Body: 'Hello!'};
//   s3bucket.upload(params, function(err, data) {
//     if (err) {
//       console.log("Error uploading data: ", err);
//     } else {
//       console.log("Successfully uploaded data to myBucket/myKey");
//     }
//   });
// });


require('./routes.js')(app);

app.listen(port, function(){
	console.log('now listening on port ' + port);
});
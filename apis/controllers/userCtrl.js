var mongoose = require('mongoose');
var User = require('../models/userSchema');

module.exports = {
	createAdmin: function(req, res) {
		User.create(req.body, function(err, response){
			if(err){
				res.status(500).json(err)
			}else{
				res.send(response);
			}
		});
	}
}
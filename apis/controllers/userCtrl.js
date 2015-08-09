var mongoose = require('mongoose');
var User = require('../models/userSchema');

module.exports = {
	createAdmin: function(req, res) {
		User.create(req.body, function(err, response){
			if(err){
				res.status(500).json(err);
			}else{
				res.send(response);
			}
		});
	},// end createAdmin
	
	checkLoggedIn: function(req, res) {
		res.send(req.isAuthenticated() ? req.user : '0');
	},
	
	loginAdmin : function(req, res) {
		res.send(req.user);
	}
	
};// end module.exports
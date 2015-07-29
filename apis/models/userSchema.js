var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var userSchema = mongoose.Schema({
	email : {type: String, required: true, unique: true, lowercase: true},
	password : {type: String, required: true }
});//end userSchema

userSchema.pre('save', function(next) {
	var user = this;
	bcrypt.genSalt(10, function(err, salt) {
		if(err) {return next(err);}
		bcrypt.hash(user.password, salt, function(err, hash){
			if(err) {return next(err);}
			else {
				user.password = hash;
				next();
			}
		});// end bcrypt.hash
	});//end bcrypt.genSalt
});//end userSchema.pre

userSchema.methods.validPassword = function(password) {
	var result = bcrypt.compareSync(password, this.password);
	if(result) {console.log("password is correct!");}
	else {console.log("incorrect password");}
	return result;
};// end password check //userSchema.methods.validPassword

module.exports = mongoose.model('User', userSchema);

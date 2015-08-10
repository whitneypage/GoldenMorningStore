var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/userSchema');
console.log(User);

module.exports = function(passport) {
	
//		PASSPORT SETUP - SERIALIZE USER ONTO AND OFF OF SESSION

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});
	
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});
	
//			SETUP UP LOCAL SIGNUP
	
	passport.use('local-signup', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	},
		function(req, email, password, done) {
		console.log('callback in passport.js in local-signup hit');
		process.nextTick(function() {
			User.findOne({'local.email' : email}, function(err, user) {
				if (err) {
					console.log(err);
					return done(err);
				}
				if(user) {
					return done(null, false, req.flash('signupMessage', 'That email is already taken'));
				} else {
					console.log('above newUser in passport.js');
					var newUser = new User();
					
					newUser.local.email = email;
					newUser.local.password = newUser.generateHash(password);
					
					console.log(newUser);
					newUser.save(function(err) {
						if(err)
							{throw err;}
						return done(null, newUser);
					});
				}
			});
		});
	}));
	
};//end module.exports
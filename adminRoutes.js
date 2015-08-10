module.exports = function(app, passport) {
	
	app.get('/api/login', function(req, res) {
		res.render('login.ejs', {message : req.flash('loginMessage')});
	});
	
	app.get('/api/register', function(req, res) {
		res.render('register.ejs', {message : req.flash('signupMessage')});
	});// end get registration page
	app.post('/api/register', passport.authenticate('local-signup', {
//		successRedirect : '/#/admin/home',
//		failureRedirect : '/',
//		failureFlash : true
	}));
	
	app.get('/api/logout', function(req, res){
		res.logout();
		res.redirect('/#/');
	});
	
	
	
};//end adminRoutes module.exports 
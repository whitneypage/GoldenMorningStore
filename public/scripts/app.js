var app = angular.module('GoldMorning', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl : 'scripts/views/user/home/homeTmpl.html',
		controller : 'homeCtrl'
	})
	
})


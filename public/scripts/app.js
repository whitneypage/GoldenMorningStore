var app = angular.module('GoldMorning', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl : 'scripts/views/user/home/homeTmpl.html',
		controller : 'homeCtrl'
	})
	.when('/product', {
		templateUrl : 'scripts/views/user/productModal/productModalTmpl.html',
		controller : 'productModalCtrl'
	})
	.when('/cart', {
		templateUrl : 'scripts/views/user/cart/cartTmpl.html',
		controller: 'cartCtrl'
	})
	
	
})


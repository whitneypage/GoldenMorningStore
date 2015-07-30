var app = angular.module('GoldMorning');

app.controller('cartCtrl', function($scope, cart, cartService) {

	$scope.cart = cart;

	$scope.removeProductFromCart = function(product) {
		cartService.removeProductFromCart(product);
	}

})


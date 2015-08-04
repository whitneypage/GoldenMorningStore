var app = angular.module('GoldMorning');

app.controller('checkoutCtrl', function($scope, cart, cartService) {

	$scope.cart = cart;
	
	console.log($scope.cart, " $scope.cart from checkoutCtrl");

	$scope.removeProductFromCart = function(product) {
		cartService.removeProductFromCart(product);
		$scope.getTotal();
	};
	
	$scope.getTotal = function() {
		$scope.total = cartService.calculatePrice($scope.cart);
	};// end getTotal;
		

});// end checkoutCrtl


var app = angular.module('GoldMorning');

app.controller('checkoutCtrl', function($scope, cart, cartService) {

	$scope.cart = cart;
	
	console.log($scope.cart, " $scope.cart from checkoutCtrl");

	$scope.removeProductFromCart = function(product) {
		cartService.removeProductFromCart(product);
		$scope.getTotal();
	};
	
	$scope.getTotal = function() {
		var total = 0;
		for(var i = 0; i < $scope.cart.length; i++) {
		  total += $scope.cart[i].price;
		}
		$scope.total = total;
	}; // end $scope.getTotal

});


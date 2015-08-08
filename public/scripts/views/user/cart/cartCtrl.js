var app = angular.module('GoldMorning');

app.controller('cartCtrl', function($scope, ProductService, $routeParams) {

	$scope.test = "fee";

	$scope.showProducts= function() {
		console.log("showing products in ctrl");
		ProductService.getProduct().then(function(products) {
			$scope.products = response;
			console.log(response, "resp");
		})
	};

var paypalId = ['{' + $routeParams.paypalId.replace(/=/ -g, ': \"').replace(/&/ -g, '\"}, {') + '}']

console.log(paypalId)

})//end cartCtrl
var app = angular.module('GoldMorning');

app.controller('cartCtrl', function($scope, ProductService) {

	$scope.test = "fee";

	$scope.showProducts= function() {
		console.log("showing products in ctrl");
		ProductService.getProduct().then(function(products) {
			$scope.products = response;
			console.log(response, "resp");
		})
	};

})//end cartCtrl
var app = angular.module('GoldMorning');

app.controller('productCtrl', function($scope, productService){

	$scope.addProduct = function() {
		productService.addProduct($scope.product)
	        .then(function(data) {
	            console.log(data);   
	    })
	};

	$scope.addColor = function() {
		var newColorSize = new ColorSize();
		$scope.product.addColorSize(newColorSize);
	}; 


	$scope.getProduct = function() {
		productService.getProduct($scope.product)
	        .then(function(data) {
	            console.log(data);   
	    })
	};

	$scope.updateProduct = function() {
		productService.updateProduct($scope.product)
	        .then(function(data) {
	            console.log(data);   
	    })
	};

	$scope.deleteProduct = function() {
		productService.deleteProduct($scope.product)
	        .then(function(data) {
	            console.log(data);   
	    })
	};

	$scope.product = new Product();
	$scope.addColor();
	$scope.addProduct();

	$scope.getProduct();
});

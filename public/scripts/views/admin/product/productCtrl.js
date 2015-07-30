var app = angular.module('GoldMorning');

app.controller('productCtrl', function($scope, ProductService){
	
	$scope.addProduct = function() {
    console.log($scope.product);
		ProductService.addProduct($scope.product)
	        .then(function(data) {
	            console.log(data);   
	    })
	};

	$scope.addColor = function() {
		var newColorSize = new ColorSize();
		$scope.product.addColorSize(newColorSize);
	}; 

  $scope.deleteColor = function(toBeDeleted) {
    $scope.product.deleteColorSize(toBeDeleted)
  }


	$scope.getProduct = function() {
		ProductService.getProduct($scope.product)
	        .then(function(data) {
	            console.log(data);   
	    });
	};

	$scope.updateProduct = function() {
		ProductService.updateProduct($scope.product)
	        .then(function(data) {
	            console.log(data);   
	    })
	};

	$scope.deleteProduct = function() {
		ProductService.deleteProduct($scope.product)
	        .then(function(data) {
	            console.log(data);   
	    })
	};

	$scope.product = new Product();
	$scope.addColor();

});

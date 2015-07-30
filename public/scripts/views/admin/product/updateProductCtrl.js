var app = angular.module('GoldMorning');

app.controller('UpdateProductCtrl', function($scope, ProductService, $routeParams, product){
		//take productId passed from route via $routeParams and assign to $scope.specProductId
	$scope.specProductId = $routeParams.productId;
	//console.log($scope.specProductId, " from UpdateProductCtrl in angular");
	
		//take product loaded via resolve in app.js and 
		//assign to $scope.specProduct
	$scope.specProduct = product;
	//console.log($scope.specProduct, " $scope.specProduct from productCtrl.js");
	
	//console.log($scope.specProduct._id, " specProduct._id");
	
	$scope.addProduct = function() {
    console.log($scope.product);
		ProductService.addProduct($scope.product)
	        .then(function(data) {
	            console.log(data);   
	    });
	};

	$scope.addColor = function() {
		var newColorSize = new ColorSize();
		$scope.product.addColorSize(newColorSize);
	}; 

  $scope.deleteColor = function(toBeDeleted) {
    $scope.product.deleteColorSize(toBeDeleted);
  };


	$scope.getProduct = function() {
		ProductService.getProduct($scope.product)
	        .then(function(data) {
	            console.log(data);   
	    })
	};

	$scope.updateProduct = function(updatedProductObj) {
		ProductService.updateProduct(updatedProductObj)
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

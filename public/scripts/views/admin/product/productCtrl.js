var app = angular.module('GoldMorning');

app.controller('productCtrl', function($scope, ProductService){

	$scope.flowFile = [];
	// $scope.uploader;
	
	$scope.addProduct = function(urlName) {
		console.log("this shiz", urlName, $scope.uploader);
		$scope.product.imageUrl = function(urlName){

		}
		ProductService.addProduct($scope.product)
	        .then(function(data) {
	            console.log(data);   
	    })
	};

	$scope.go = function(x){
		console.log('kittens', x)
	}

	$scope.addColor = function() {
		var newColorSize = new ColorSize();
		$scope.product.addColorSize(newColorSize);
	}; 

	$scope.addImg = function(){
		$scope.product.addImg($scope.newImage);
	}

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
	$scope.addImg();

});

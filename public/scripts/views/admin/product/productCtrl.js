var app = angular.module('GoldMorning');

app.controller('productCtrl', function($scope, ProductService){

	$scope.addProduct = function(flow) {

		$scope.product.images = [];

		for(var i = 0; i < flow.files.length; i++){
			var name = flow.files[i].name.replace(/ /g, "+");
			$scope.product.images.push("https://s3-us-west-2.amazonaws.com/goldmorning/"+name);
		}
		console.log("this shiz", flow, "$scope.product");
		for(var i = 0; i < $scope.product.colorSize.length; i++){
			$scope.product.colorSize[i].mainImg = $scope.product.images[($scope.product.colorSize[i].imageNumber) - 1];
		}
		ProductService.addProduct($scope.product)
	        .then(function(data) {
	            console.log(data);   
	    })
	};

	$scope.go = function(x){
		console.log('kittens', x, 'product', $scope.product)
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

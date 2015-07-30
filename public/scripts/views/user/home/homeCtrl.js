var app = angular.module('GoldMorning');

app.controller('homeCtrl', function($scope, ProductService) {

$scope.getProducts = function(){
	ProductService.getProduct().then(function(data) {
		console.log(data);
		$scope.products = data;
		$scope.products.colorSize.mainImage = $scope.products.image
	})
};

$scope.getProducts();
	
	
});//end homeCtrl
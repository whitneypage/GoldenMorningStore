var app = angular.module('GoldMorning');

app.controller('homeCtrl', function($scope, ProductService, cart) {



$scope.getProducts = function(){
	ProductService.getProduct().then(function(data) {
		console.log(data);
		$scope.products = data;
		$scope.products.colorSize.mainImage = $scope.products.image
	})
};

$scope.getProducts();
	
$scope.sizes = ["S", "M", "L"];	

$scope.cart = cart;

$scope.addProductToCart = function(product._id, color, size) {
	/*create a product object by combining all parameters above*/
	var productObject = {
		refId: product._id
		, imageUrl: product.mainImg
		, name: product.productTitle
		, color: color
		, size: size
		, price: product.price
	}
	/*add product object to cart array*/
	/*pull down modal for a second or two*/
};

});//end homeCtrl
var app = angular.module('GoldMorning');

app.controller('homeCtrl', function($scope, ProductService, cart, cartService) {



	$scope.getProducts = function(){
		ProductService.getProduct().then(function(data) {
			console.log(data);
			$scope.products = data;
		/*	$scope.products.colorSize.mainImage = $scope.products.image*/
		})
	};

	$scope.getProducts();
		
	$scope.sizes = ["S", "M", "L"];	

	$scope.cart = cart;

	$scope.addProductToCart = function(product, colorSize, size) {
		var productObject = {
			name: product.productTitle
			, refId: product._id
			, imageUrl: colorSize.mainImg
			, color: colorSize.color
			, size: size
			, price: product.price
		};
		console.log(productObject);
		cartService.addProductToCart(productObject).then(function(response) {
			console.log(response);
			/*reset dynamic values to empty (cf. Mark)*/
			$scope.cart = response.data;
			/*pull down modal for a second or two*/
		})
	};

});//end homeCtrl

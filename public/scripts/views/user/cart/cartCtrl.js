var app = angular.module('GoldMorning');

app.controller('cartCtrl', function($scope, ProductService, cart, cartService) {

	$scope.openProductModal = false;

	$scope.productModalData = function(product) {
		console.log("test", product);
		$scope.product = product;
	}

	$scope.open = function() {
		$scope.openProductModal = !$scope.openProductModal
		console.log('open clicked ', $scope.openProductModal)
	}

	$scope.getProducts = function(){
		ProductService.getProduct().then(function(data) {
			console.log('get product', data);
			$scope.products = data;
		})
	};

	// $scope.changeFilter = function(filter){
	// 	$scope.productFilter = filter;
	// }
	// $scope.productFilter = "bottom";

	$scope.getProducts();
		
	$scope.sizes = ["L", "M", "S"];	

	$scope.cart = cart;

	$scope.addProductToCart = function(product, colorSize, size) {
		var productObject = {
			name: product.productTitle
			, refId: product._id
			, colorSizeId: colorSize._id
			, imageUrl: colorSize.mainImg
			, color: colorSize.color
			, size: size
			, price: product.price
		};
		console.log(productObject);
		console.log("colorSize", colorSize._id);
		cartService.addProductToCart(productObject).then(function(response) {
			console.log(response.data);
			/*reset dynamic values to empty (cf. Mark)*/
			$scope.cart = response.data;
			// $scope.$apply();
			/*pull down modal for a second or two*/
			$scope.getTotal($scope.cart);
		});
	};

	$scope.removeProductFromCart = function(id) {
		console.log("Cart", cart);
		console.log("removing id", id);
		cartService.removeProductFromCart(id).then(function(response) {
			console.log(response);
			$scope.cart = response.data;
			console.log("Cart 23r", $scope.cart);
			$scope.getTotal($scope.cart);
		});
	};

	$scope.getTotal = function() {
		$scope.total = cartService.calculatePrice($scope.cart);
	}; // end $scope.getTotal
	
		$scope.decSizesFromCart = function() {
			ProductService.decrementSize($scope.cart);
		};//end decSizesFromCart


})//end cartCtrl
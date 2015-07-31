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
		
	$scope.sizes = ["L", "M", "S"];	

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
			console.log(response.data);
			/*reset dynamic values to empty (cf. Mark)*/
			cart = response.data;
			/*pull down modal for a second or two*/
		})
	};

});

// Product Modal CUSTOM DIRECTIVE

app.directive('productModal', function() {
	var modal = function(scope, element, attrs) {
		$(element).on('click', 'img', function() {
			$('#modal1').openModal();
		});
	};

	return {
		restrict: 'A',
		link: modal
	}
});

app.directive('cartModal', function() {
	var modal = function(scope, element, attrs) {
		$(element).on('click', 'button', function() {
			console.log('clicked!');
			$('#modal2').openModal();
		});
	}

	return {
		restrict: 'A',
		link: modal
	}
});
//end homeCtrl

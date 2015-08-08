var app = angular.module('GoldMorning');

app.controller('homeCtrl', function($scope, ProductService, cart, cartService) {

	$scope.scroll = function() {
    console.log("clicked");
  }

	$scope.open = function() {
		$scope.openProductModal = !$scope.openProductModal
		console.log('open clicked ', $scope.openProductModal)
	}

  $scope.passInProduct = function(product) {
  $scope.selectedProduct = product;
  console.log($scope.selectedProduct);
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

  $scope.sizes = ["S", "M", "L"];

  $scope.inStock = function(selected) {
      if (selected > 0) {
        return true
      } 
  }

  $scope.anyAvailable = function(colorSize) {
      if (colorSize.smallQty <= 0 && colorSize.mediumQty <= 0 && colorSize.largeQty <= 0) {
        return true
      }
  }

  $scope.available = true;

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
	
});// end homeCtrl


// Cart Modal Directive

app.directive('cartModal', function() {
	var modal = function(scope, element, attrs) {
		$(element).on('click', function() {
			console.log('clicked!', scope.cart);
			$('#modal2').openModal();
		});
	};

	return {
		restrict: 'A',
		link: modal
	}
});
//end homeCtrl

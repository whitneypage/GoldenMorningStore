var app = angular.module('GoldMorning');


app.controller('thankyouCtrl', function($scope, $routeParams, orderService, ProductService, cartService, checkedOutCart){
	
	console.log($routeParams);
	$scope.checkedOutCart = checkedOutCart;
	console.log($scope.checkedOutCart);
	
	orderService.getOrderDetails($routeParams._id).then(function(data){
	  if(data.data.status === "approved"){
	  	ProductService.decrementSize($scope.checkedOutCart);
			orderService.emptyCart().then(function(data){
				console.log('cart is empty now... fyi', data)
			})
		}
		console.log('after order updateOrderByPaymentId', data);
	})

	orderService.updateOrderByPaymentId($routeParams).then(function(data){
		if(data.data.status === "200") {
			ProductService.decrementSize($scope.checkedOutCart);
			orderService.emptyCart();
		}
	});
});// end thankyouCtrl



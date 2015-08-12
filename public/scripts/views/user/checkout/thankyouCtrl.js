var app = angular.module('GoldMorning');

app.controller('thankyouCtrl', function($scope, $routeParams, orderService, ProductService, cartService, checkedOutCart){
	$scope.checkedOutCart = checkedOutCart;
	console.log($scope.checkedOutCart);
	
	$scope.payerId = $routeParams.PayerID;
	$scope.name = 'Andy';
	console.log($routeParams);

	orderService.updateOrderByPaymentId($routeParams).then(function(data){
		if(data) {
			
			ProductService.decrementSize($scope.checkedOutCart);
			orderService.emptyCart();
	
		}
//		ProductService.decrementSize(data.data.products);
	});
});// end thankyouCtrl



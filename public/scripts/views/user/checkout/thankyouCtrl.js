var app = angular.module('GoldMorning');

app.controller('thankyouCtrl', function($scope, $routeParams, orderService, ProductService, cartService){
	$scope.payerId = $routeParams.PayerID;
	$scope.name = 'Andy';
	console.log($routeParams)

	orderService.updateOrderByPaymentId($routeParams).then(function(data){
		if(data) {
			cartService.getCart().then(function(checkedOutCart){
			ProductService.decrementSize(checkedOutCart).then(function(data){
				if(data){
					orderService.emptyCart().then(function(data){
					console.log('cart is empty now... maybe', data)
					})
				}			
			});	

			});
		}
//		ProductService.decrementSize(data.data.products);
	});
});// end thankyouCtrl



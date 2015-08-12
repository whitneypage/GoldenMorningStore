var app = angular.module('GoldMorning');

app.controller('thankyouCtrl', function($scope, $routeParams, orderService){
	$scope.payerId = $routeParams.PayerID;
	$scope.name = 'Andy';
	console.log($routeParams)

	orderService.updateOrderByPaymentId($routeParams).then(function(data){
		if(data.data.status === "200"){
			orderService.emptyCart().then(function(data){
				console.log('cart is empty now... maybe', data)
			})
		}
		console.log('after order updateOrderByPaymentId', data);
	})

});

var app = angular.module('GoldMorning');

app.controller('thankyouCtrl', function($scope, $routeParams, orderService){

	console.log($routeParams);

	orderService.getOrderDetails($routeParams._id).then(function(data){
	  if(data.data.status === "approved"){
			orderService.emptyCart().then(function(data){
				console.log('cart is empty now... fyi', data)
			})
		}
		console.log('after order updateOrderByPaymentId', data);
	})
	})

	var completeGuestCheckout = function(){

	}

	orderService.updateOrderByPaymentId($routeParams).then(function(data){
		if(data.data.status === "200"){
			orderService.emptyCart().then(function(data){
				console.log('cart is empty now... maybe', data)
			})
		}
		console.log('after order updateOrderByPaymentId', data);
	})

});

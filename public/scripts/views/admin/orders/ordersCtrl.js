var app = angular.module('GoldMorning');

app.controller('ordersCtrl', function($scope, orders, orderService) {
	
	$scope.orders = orders;
	$scope.showOrder = function(order) {
		order.show = !order.show;
	}

	$scope.paymentStatusOptions = ['waiting', 'processing', 'paid'];
	$scope.orderStatusOptions = ['processing', 'shipping', 'on hold', 'delivered'];

	$scope.updateOrder = function(orderId, paymentStatus, orderStatus) {
		orderService.updateOrder(orderId, paymentStatus, orderStatus).then(function(response) {
			Materialize.toast('order updated', 1000);	
		})
	}

});
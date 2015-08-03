var app = angular.module('GoldMorning');

app.controller('ordersCtrl', function($scope, orders, orderService) {

	$scope.orders = orders.data;
	console.log($scope.orders);

	$scope.showOrder = function(order) {
		order.show = !order.show;
	}

	// $scope.paymentStatusOptions = ['processing', 'paid'];
	$scope.orderStatusOptions = ['processing', 'shipping', 'on hold', 'delivered'];

	$scope.updateOrder = function(orderId, paymentStatus, orderStatus) {
		orderService.updateOrder(orderId, orderStatus).then(function(response) {
			Materialize.toast('order updated', 1000);	
		})
	};

});
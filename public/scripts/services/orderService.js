var app = angular.module('GoldMorning');

app.service('orderService', function($http, $q){

	this.createOrder = function(order) {
		return $http({
			method: 'POST',
			url: '/api/user/order',
			data: order
		})
	};

	this.getOrderDetails = function(id) {
		return $http({
			method: 'GET',
			url: '/api/admin/order/' + id
		})
	};

	this.getAllOrders = function() {
		return $http({
			method: 'GET',
			url: '/api/admin/orders'
		})
	};

	this.updateOrder = function(id, orderObj) {
		console.log('in service');
		return $http({
			method: 'PUT',
			url: '/api/admin/order/' + id,
			data: orderObj
		})
	};

	this.updateOrderByPaymentId = function(orderObj){
		console.log(orderObj.paymentId)
		return $http({
			method: 'PUT',
			url: '/api/user/order/' + orderObj.paymentId,
			data: orderObj
		})
	};


});
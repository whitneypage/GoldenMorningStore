var app = angular.module('GoldMorning');

app.service('cartService', function($http, $q) {
	
	this.addProductToCart = function(data) {
		return $http({
			method: 'POST',
			url: '/api/user/cart',
			data: data
		})
	};

	this.getCart = function() {
		var dfd = $q.defer();
		$http({
			method: 'GET',
			url: '/api/user/cart'   
		}).then(function(res){
			dfd.resolve(res.data);
		}, function(err){
			dfd.reject(err);
		});
		return dfd.promise;
	};

	this.removeProductFromCart = function(id) {
		return $http({
			method: 'PUT',
			url: '/api/user/cart/' + id,
		})
	};
}) 

app.service('orderService', function($http, $q) {

	this.createOrder = function(order) {
		return $http({
			method: 'POST',
			url: '/api/order',
			data: order
		})
	};

	this.getOrder = function(id) {
		return $http({
			method: 'GET',
			url: '/api/order' + id
		})
	};

	this.getAllOrders = function() {
		return $http({
			method: 'GET',
			url: '/api/orders'
		})
	};

	this.updateOrder = function(id, orderStatus) {
		return $http({
			method: 'PUT',
			url: 'api/order' + id,
			data: {
				status: orderStatus
			}
		})
	};

})
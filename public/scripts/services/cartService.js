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
		console.log("at remove in service");
		return $http({
			method: 'PUT',
			url: '/api/user/cart/' + id,
		})
	};
	
	this.calculatePrice = function(cartObj) {
		console.log(cartObj, " cartObj from cartService");
		var total = 0; 
		for(var i = 0; i < cartObj.length; i++) {
		total += cartObj[i].price;
	}
		return total;
	};// end calculatePrice
});// end cartService


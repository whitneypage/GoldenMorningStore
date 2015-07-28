var app = angular.module('GoldMorning');

app.service('AdminService', function($http, $q) {
	this.getAdminProducts = function() {
		var deferred = $q.defer();
		$http({
			method : 'GET',
			url: "/api/products",
		}).then(function(response){
			console.log(response.data, " response.data from getAdminProducts");
				deferred.resolve(response.data);
		});//end .then
			return deferred.promise;
	};//end AdminService.getAdminProducts
	
	
});// end AdminService
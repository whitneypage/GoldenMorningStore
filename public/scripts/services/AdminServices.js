var app = angular.module('GoldMorning');

app.service('AdminService', function($http, $q) {
	this.getAdminProducts = function() {
		$http({
			method : 'GET',
			url: ""
		})
	}
	
	
});// end AdminService
var app = angular.module('GoldMorning');

app.service('AdminService', function($http, $q) {
	this.getAdminProducts = function() {
		var deferred = $q.defer();
		$http({
			method : 'GET',
			url: "/api/products"
		}).then(function(response){
			console.log(response.data, " response.data from getAdminProducts");
				deferred.resolve(response.data);
		});//end .then
			return deferred.promise;
	};//end AdminService.getAdminProducts
	
this.updateSmallQty = function(smallQtyObj){
	console.log(smallQtyObj, ' smallQtyObj from AdminService.updateSmallQty');
	
	//got mongo _id and new qty from front
	//will pick up here tomorrow >^.^<
	
//	var deferred = $q.defer();
//	$http({
//		method : 'PUT',
//		url: "/api/produts/:productId",
//		data: {
//			_id : smallQtyObj.id,
//			qty : smallQtyObj.qty
//		}
//	}).then(function(response) {
//		deferred.resolve(response.data);
//	});
//	return deferred.promise;
};//end updateSmallQty
	
	
});// end AdminService
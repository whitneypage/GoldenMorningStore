var app = angular.module('GoldMorning');

app.service('ProductService', function($http, $q) {


	
	//****TYTEBBS SERIVICES FROM OLD productService.js***//
	
	this.addProduct = function(product){
          console.log("ProductInService", product);
        console.log('add product service hit')
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: "/api/products",
            data: product
        }).then(function(response) {
            deferred.resolve(response.data)
        });
        return deferred.promise;
    };// end ProductService.addProduct
	
	this.getProduct = function(product){
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: "/api/products",
        }).then(function(response) {
            console.log('I got the data I requested');
            deferred.resolve(response.data)
        });
        return deferred.promise;
    }; // end ProductService.getProduct
	
	this.getOneProduct = function(productId) {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: "/api/products/" + productId
		}).then(function(response) {
			console.log(response.data, " response.data from getOneProduct in ProductService")
			deferred.resolve(response.data)
		})//end .then
		return deferred.promise;
	};// end ProductService.getOneProduct
	
	this.updateProduct = function(product){
        console.log('update product service hit')
				console.log(product, " product from updateProductService in ProductService");
        var deferred = $q.defer();
        $http({
            method: 'PUT',
            url: "/api/products/" + product._id,
						data : {
							_id : product._id,
							product : product
						}
        }).then(function(response) {
            deferred.resolve(response.data)
        });
        return deferred.promise;
    };// end ProductService.updateProduct
	
	this.deleteProduct = function(product){
        console.log('delete product service hit')
        var deferred = $q.defer();
        $http({
            method: 'DELETE',
            url: "/api/products",
        }).then(function(response) {
            deferred.resolve(response.data)
        });
        return deferred.promise;
    };//end ProductService.deleteProduct
	
	//	**RH - MAY NOT NEED**  \\
	
this.updateSmallQty = function(smallQtyObj){
	console.log(smallQtyObj, ' smallQtyObj from AdminService.updateSmallQty');
	
	var deferred = $q.defer();
	$http({
		method : 'PUT',
		url: "/api/produts/:productId",
		data: {
			_id : smallQtyObj.id,
			qty : smallQtyObj.qty
		}
	}).then(function(response) {
		deferred.resolve(response.data);
	});
	return deferred.promise;
};//end updateSmallQty
	
});// ********end AdminService*********







//		//**RH - PROBABLY DONT NEED**\\
//
//	this.getAdminProducts = function() {
//		var deferred = $q.defer();
//		$http({
//			method : 'GET',
//			url: "/api/products"
//		}).then(function(response){
//			console.log(response.data, " response.data from getAdminProducts");
//				deferred.resolve(response.data);
//		});//end .then
//			return deferred.promise;
//	};//end AdminService.getAdminProducts


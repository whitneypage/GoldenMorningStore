var app = angular.module('GoldMorning');

app.service('productService', function($http, $q){

    this.addProduct = function(product){
        console.log('add product service hit')
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: "http://localhost:1337/products",
            headers: {
               'Content-Type': "application/json"
            },
            data: {product: product}
        }).then(function(response) {
            deferred.resolve(response.data)
        });
        return deferred.promise;
    }

    this.getProduct = function(product){
        console.log('get product service hit')
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: "./product/data.json",
        }).then(function(response) {
            deferred.resolve(response.data)
        });
        return deferred.promise;
    }

    this.updateProduct = function(product){
        console.log('update product service hit')
        var deferred = $q.defer();
        $http({
            method: 'PUT',
            url: "http://localhost:1337/products/",
        }).then(function(response) {
            deferred.resolve(response.data)
        });
        return deferred.promise;
    }

    this.deleteProduct = function(product){
        console.log('delete product service hit')
        var deferred = $q.defer();
        $http({
            method: 'DELETE',
            url: "http://localhost:1337/products",
        }).then(function(response) {
            deferred.resolve(response.data)
        });
        return deferred.promise;
    }
    
});
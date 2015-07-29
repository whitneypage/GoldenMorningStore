var app = angular.module('GoldMorning');

app.controller('adminHomeCtrl', function($scope, products) {
	$scope.adminHomeTest = "This is the adminHomeTmpl.html. trappin hard from the adminHomeCtrl!"
	

		$scope.products = products;
	
});//end adminHomeCtrl
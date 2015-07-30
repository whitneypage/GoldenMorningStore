var app = angular.module('GoldMorning');

app.controller('homeCtrl', function($scope, ProductService) {

$scope.getProducts = function(){
	ProductService.getProduct().then(function(data) {
		console.log(data);
		$scope.products = data;
	})
};

$scope.getProducts();
	
	
});


app.directive('productModal', function() {
	var modal = function(scope, element, attrs) {
		$(element).on('click', 'img', function() {
			console.log('clicked!');
			$('#modal1').openModal();
		});
	};

	return {
		restrict: 'A',
		link: modal
	}
});


//end homeCtrl
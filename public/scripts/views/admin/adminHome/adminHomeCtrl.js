var app = angular.module('GoldMorning');

app.controller('adminHomeCtrl', function($scope, products, ProductService, $route) {
	$scope.adminHomeTest = "This is the adminHomeTmpl.html. trappin hard from the adminHomeCtrl!"
	//show and hide edit size inputs 
	//defaults to hidden
	$scope.confirmDelete = false;
	
	$scope.toggleShowEditSizes = function() {
		$scope.showEditSizes = !$scope.showEditSizes;
	};
	
	//takes products from resolve in app.js and sets to $scope.products
	$scope.products = products;
	
	//takes mongo _id of specific colorSize object from ng-repeat
	//takes new qty for small
	$scope.updateSmallQty=function(id, updatedQty) {
		var smallQtyObj = {
			id: id,
			qty: updatedQty
		};
		//console.log(smallQtyObj.id, " smallQtyObj.id, ", smallQtyObj.qty, " smallQtyObj.qty from adminHomeCtrl");
		ProductService.updateSmallQty(smallQtyObj);
		$scope.showEditSizes = false;
		
	};//end updateSmallQty
	
	$scope.toggleConfirmDelete = function(mongoId) {
		$scope.confirmId = mongoId;
		console.log($scope.confirmId);
		$scope.confirmDelete = true;
	}
	
	
	$scope.deleteProduct = function(mongoId){
		console.log(mongoId);
		ProductService.deleteProduct(mongoId)
		.then(function(data){
			console.log("then from deleteProduct in adminHomeCtrl")
			$scope.confirmDelete = false;
			$route.reload();
		})
	}// end deleteProduct
	
	app.directive('productModal', function() {
	var modal = function(scope, element, attrs) {
		$(element).on('click', 'img', function() {
			console.log('clicked!');
			$('#modal2').openModal();
		});
	};

	return {
		restrict: 'A',
		link: modal
	}
});//end app.directive 'productModal'

	
	
});//end adminHomeCtrl
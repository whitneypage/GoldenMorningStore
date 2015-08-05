var app = angular.module('GoldMorning');

app.controller('ordersCtrl', function($scope, orders, orderService) {

	$scope.orders = orders.data;
	console.log($scope.orders);

	$scope.showOrder = function(order) {
        order.show = !order.show;
    }



	$scope.orderStatusOptions = ['processing', 'shipped', 'on hold', 'canceled'];

	$scope.updateOrder = function(orderId, orderNote, orderStatus) {
		orderService.updateOrder(orderId, orderNote, orderStatus).then(function(response) {
			Materialize.toast('order updated', 2000);	
		})
	};

	$scope.collapsibleElements = [{
        icon: 'mdi-image-filter-drama',
        title: 'First',
        content: 'Lorem ipsum dolor sit amet.'
    },{
        icon: 'mdi-maps-place',
        title: 'Second',
        content: 'Lorem ipsum dolor sit amet.'
    },{
        icon: 'mdi-social-whatshot',
        title: 'Third',
        content: 'Lorem ipsum dolor sit amet.'
    }
];

});
var app = angular.module('GoldMorning', ['ngRoute', 'ui.materialize', 'flow', 'angular-carousel', 'smoothScroll']);

//This is just a comment
//More comments

app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl : 'scripts/views/user/home/homeTmpl.html',
		controller : 'homeCtrl',
		resolve: {
			cart: function(cartService) {
				return cartService.getCart();
			}
		}
	})
	// .when('/product', {
	// 	templateUrl : 'scripts/views/user/productModal/productModalTmpl.html',
	// 	controller : 'productModalCtrl'
	// })

	.when('/cart', {
		templateUrl : 'scripts/views/user/cart/cartTmpl.html',
		controller: 'cartCtrl'
	})
	.when('/checkout', {
		templateUrl : 'scripts/views/user/checkout/checkoutTmpl.html',
		controller : 'checkoutCtrl', 
		resolve: {
			cart: function(cartService) {
				return cartService.getCart();
			}
		}
	})
	.when('/admin/home', {
		templateUrl : 'scripts/views/admin/adminHome/adminHomeTmpl.html',
		controller : 'adminHomeCtrl',
		resolve: {
			products: function(ProductService) {
				return ProductService.getProduct();
			}
		}
	})
	.when('/admin/orders', {
		templateUrl : 'scripts/views/admin/orders/ordersTmpl.html',
		controller : 'ordersCtrl',
		resolve: {
			orders: function(orderService) {
				return orderService.getAllOrders();
			}
		}
	})
	.when('/admin/product', {
		templateUrl : 'scripts/views/admin/product/productTmpl.html',
		controller : 'productCtrl'
	})
	.when('/admin/product/:productId', {
		templateUrl : 'scripts/views/admin/product/updateProductTmpl.html',
		controller : 'UpdateProductCtrl',
		resolve : {
			product : function(ProductService, $route) {
				var productId = $route.current.params.productId;
				return ProductService.getOneProduct(productId);
			}
		}
	})
	.when('/user/paypal', {
		templateUrl: 'scripts/views/user/checkout/checkoutTmpl.html',
		controller: 'checkoutCtrl',
		resolve: {
			cart: function(cartService) {
				return cartService.getCart();
			}
		}
	})
	.when('/admin/login', {
		templateUrl : 'scripts/views/admin/login/adminLogin.html',
		controller : 'adminLoginCtrl'
	})
	.otherwise('/');
});//end app.config in app.js


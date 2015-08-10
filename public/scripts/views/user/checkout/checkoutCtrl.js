var app = angular.module('GoldMorning');

app.controller('checkoutCtrl', function($window, $routeParams, $scope, cart, cartService, orderService) {

	$scope.cart = cart;
	
	console.log($scope.cart, " $scope.cart from checkoutCtrl");

	$scope.removeProductFromCart = function(product) { 
		cartService.removeProductFromCart(product).then(function(response) {
			$scope.cart = response.data;
			$scope.getTotal($scope.cart);
		});
	};

	$scope.product = payment;

	$scope.orderDetails = {};

	$scope.paypalCheckout = function(){
		var products = [];
		var total = $scope.getTotal();
		for(var i = 0; i < cart.length; i++){
			var newProduct = {
				product: cart[i].refId,
				size: cart[i].size,
				color: cart[i].color,
				colorSizeId: cart[i].colorSizeId
			};
			products.push(newProduct);
		}
		var order = {products: products, total: total};
		cartService.createOrder(order).then(function(orderData){
			var order_Id = orderData.data._id;
			var payment = {
			  "intent": "sale",
			  "payer": {
			    "payment_method": "paypal"
			  },
			  "redirect_urls": {
			    "return_url": "http://localhost:1337/#/thankyou",
			    "cancel_url": "http://localhost:1337/#/cancel"
			  },
			  "transactions": [{
			    "amount": {
			      "total": $scope.total,
			      "currency": "USD"
			    },
			    "description": "GoldMorningShop order # " + order_Id
			  }]
			};
			cartService.createPmt(payment).then(function(paymentData){
				console.log("response from paypal payment create request", paymentData)
				orderService.updateOrder(order_Id, paymentData).then(function(){
			      var redirectUrl;
			      for(var i=0; i < paymentData.data.links.length; i++) {
			        var link = paymentData.data.links[i];
			        if (link.method === 'REDIRECT') {
			          redirectUrl = link.href;
			        }
			      }
			      $window.location.href = redirectUrl;
					});
				});
		});
	};

	var paymentSuccess = function(){
		cartService.paymentSuccess($scope.payerId).then(function(data){
			console.log("after paypal confirmation", data)
		})
	};

	$scope.confirmPmt = function(){
		ProductService.executePayment($scope.orderDetails).then(function(data){
			console.log(data);
		})
	};

	
	$scope.getTotal = function() {
		$scope.total = cartService.calculatePrice($scope.cart);
	};// end getTotal;
		
	$scope.getTotal();

});// end checkoutCrtl



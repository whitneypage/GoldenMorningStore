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

	var payment = {
	  "intent": "sale",
	  "payer": {
	    "payment_method": "credit_card",
	    "funding_instruments": [{
	      "credit_card": {
	        "number": "5500005555555559",
	        "type": "mastercard",
	        "expire_month": 12,
	        "expire_year": 2018,
	        "cvv2": 111,
	        "first_name": "Joe",
	        "last_name": "Shopper"
	      }
	    }]
	  },
	  "transactions": [{
	    "amount": {
	      "total": "5.00",
	      "currency": "USD"
	    },
	    "description": "My awesome payment"
	  }]
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

    $scope.ifNotClothing = function (product, colorSize) {
      if (product.productCategory === "Accessories" || product.productCategory === "Soaps/Scrubs") {
        return true
      }
  }

	
	$scope.getTotal = function() {
		$scope.total = cartService.calculatePrice($scope.cart);
	};// end getTotal;
		
	$scope.getTotal();

	$scope.name = 'test';
	var getParams = function(){
		if($routeParams.payerID){
			console.log('routeparams')
		}
	};
	getParams();
	// $scope.payerId = $routeParams.param1.payerID;

});// end checkoutCrtl



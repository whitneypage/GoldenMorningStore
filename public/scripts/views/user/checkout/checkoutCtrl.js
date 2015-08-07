var app = angular.module('GoldMorning');

app.controller('checkoutCtrl', function($window, $scope, cart, cartService) {

	$scope.cart = cart;
	
	console.log($scope.cart, " $scope.cart from checkoutCtrl");

	$scope.removeProductFromCart = function(product) { 
		cartService.removeProductFromCart(product);
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
		cartService.createOrder(order).then(function(data){
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
			    "description": "GoldMorningStore order # " + data.data._id
			  }]
			};
			cartService.createPmt(payment).then(function(data){
				
				console.log("response from paypal payment create request", data)
		      var redirectUrl;
		      for(var i=0; i < data.data.links.length; i++) {
		        var link = data.data.links[i];
		        if (link.method === 'REDIRECT') {
		          redirectUrl = link.href;
		        }
		      }
		      // $window.location.href = redirectUrl;
				});
		});
	};
	
	$scope.sendPmt = function(){
		console.log('pmt sent', payment);
		Paypal.payment.create(req.body.payment, function (error, payment) {
			if (error) {
			  console.log(error);
		  } else {
		    if(payment.payer.payment_method === 'paypal') {
		      var redirectUrl;
		      for(var i=0; i < payment.links.length; i++) {
		        var link = payment.links[i];
		        if (link.method === 'REDIRECT') {
		          redirectUrl = link.href;
		        }
		      }
		      $window.location.href = redirectUrl;
		    }
		    session.payment = payment;
		    res.json(payment)
		  }
		});
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



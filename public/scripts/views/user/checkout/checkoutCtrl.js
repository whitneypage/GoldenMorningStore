var app = angular.module('GoldMorning');

app.controller('cartCtrl', function($scope, cart, cartService) {

	$scope.cart = cart;

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

	$scope.orderDetails = {};

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

});


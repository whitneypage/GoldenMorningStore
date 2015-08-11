var app = angular.module('GoldMorning');

app.controller('checkoutCtrl', function($q, $window, $routeParams, $scope, cart, cartService, orderService, ProductService) {

	$scope.cart = cart;

	$scope.getTotal = function() {
		$scope.total = cartService.calculatePrice($scope.cart);
		return $scope.total;
	};// end getTotal;

	console.log('this', cartService.calculatePrice($scope.cart));

	$scope.getTotal();
	
	
	console.log($scope.cart, " $scope.cart from checkoutCtrl");

	$scope.removeProductFromCart = function(product) { 
		cartService.removeProductFromCart(product).then(function(response) {
			$scope.cart = response.data;
			$scope.getTotal($scope.cart);
		});
	};

	$scope.guestCheckout = function() {
		// var orderData = createOrder();
		var products = [];
		var total = $scope.total;
		for(var i = 0; i < cart.length; i++){
			var newProduct = {
				product: cart[i].refId,
				size: cart[i].size,
				color: cart[i].color,
				colorSizeId: cart[i].colorSizeId
			};
			products.push(newProduct);
		}
		var order = {products: products, total: total, note: 'tyler tebbbzzzz'};
		cartService.createOrder(order).then(function(orderData){
			console.log('orderData', orderData)
			var payment = {
				"intent": "sale",
			  "payer": {
			    "payment_method": "credit_card",
			    "funding_instruments": [{
			      "credit_card": {
			        "number": $scope.creditCard,
			        "type": $scope.ccType,
			        "expire_month": $scope.expireMonth,
			        "expire_year": $scope.expireYear,
			        "cvv2": $scope.ccv,
			        "first_name": $scope.firstName,
			        "last_name": $scope.lastName,
			        "billing_address": {
			          "line1": $scope.street,
			          "city": $scope.city,
			          "state": $scope.state,
			          "postal_code": $scope.zip,
			          "country_code": "US" }}}]},
			  "transactions": [{
			    "amount": {
			      "total": $scope.total,
			      "currency": "USD",
			      "details": {
			        "subtotal": $scope.total,
			        "tax": "0.00",
			        "shipping": "0.00"}},
			    "description": "GoldMorningShop order # " + orderData.data._id
			  }]
			};
			cartService.createPmt(payment).then(function(paymentData){
				console.log('this is the payment data GUEST CHECKOUT', paymentData.data.id);
				var pmt = paymentData.data.payer.funding_instruments[0].credit_card;
				var updateData = {
					status: paymentData.data.state,
					paymentId: paymentData.data.id,
					customer: {
						name: {
							first: pmt.first_name,
							last: pmt.last_name
						},
						email: $scope.email,
						payerId: pmt.number,
						shippingAddress: {
							street: pmt.billing_address.line1,
							city: pmt.billing_address.city,
							state: pmt.billing_address.state,
							zip: pmt.billing_address.postal_code,
							country_code: pmt.billing_address.country_code
						}
					}
				};
				orderService.updateOrder(orderData.data._id, updateData).then(function(updatedOrderObj){
					console.log('THE END', updatedOrderObj);
				})
			})
		})
	};//end guestCheckout
		
	$scope.paypalCheckout = function(){
	    var products = [];
	    var total = $scope.total;
	    for(var i = 0; i < cart.length; i++){
	        var newProduct = {
	            product: cart[i].refId,
	            size: cart[i].size,
	            color: cart[i].color,
	            colorSizeId: cart[i].colorSizeId
	        };
	        products.push(newProduct);
	    }
			console.log('total', total)
	    var order = {products: products, total: total, note: 'tyler tebbbzzzz'};
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
	        console.log('sending this shiz to paypal', payment);
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
	};//end paypalCheckout

	

});// end checkoutCrtl




// NAVBAR MAGIC

$(document).ready(function(){
	$(window).bind('scroll', function() {
	   var navHeight = $( window ).height() - 0;
			 if ($(window).scrollTop() > navHeight) {
				 $('nav').addClass('fixed');
			 }
			 else {
				 $('nav').removeClass('fixed');
			 }
		});

	// $(window).bind('scroll', function() {
	//    var navHeight = $( window ).height() - 70;
	// 		 if ($(window).scrollTop() > navHeight) {
	// 			 $('.adminNav').addClass('fixed');
	// 		 }
	// 		 else {
	// 			 $('adminNav').removeClass('fixed');
	// 		 }
	// 	});

	$(".button-collapse").sideNav();

	$('.tooltipped').tooltip({delay: 20});

	$('.dropdown-button').dropdown({
		constrain_width: false,
		gutter: 15,
		belowOrigin: true
	});

	$('.slider').slider();
	
	
	

});

// $(function() {
// 		$('.slider').slider();
// 	});

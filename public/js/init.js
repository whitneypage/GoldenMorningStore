
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

	$(".button-collapse").sideNav();

	$("product-modal").click(function(){
		console.log("clicked");
		$('#modal1').openModal();
	});

});
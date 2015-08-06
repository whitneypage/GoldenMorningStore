
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

	$('.tooltipped').tooltip({delay: 50});

	$('.dropdown-button').dropdown({
		constrain_width: false,
		gutter: 15,
		belowOrigin: true
	});

	$('.slider').slider();

	$('.thumbnail').live("click", function() {
        $('#mainImage').hide();
        $('#imageWrap').css('background-image', "url('ajax-loader.gif')");
        var i = $('<img />').attr('src',this.href).load(function() {
            $('#mainImage').attr('src', i.attr('src'));
            $('#imageWrap').css('background-image', 'none');
            $('#mainImage').fadeIn();
        });
        return false; 
    });
	
	
	

});

// $(function() {
// 		$('.slider').slider();
// 	});

$(function(){


	/*  Gallery lightBox
 	================================================*/ 

 	if( $(".lightbox").length > 0 ) {

		$(".lightbox").prettyPhoto();
		
	}

	/*  Owl carousel
 	================================================*/ 

 	if( $(".owl-carousel").length > 0 ) {

		$(".owl-carousel").owlCarousel({

			 margin:25,
			 stagePadding: 25,
	   		 nav:true,
	   		 navText: [
		      "<i class='glyphicon glyphicon-chevron-left'></i>",
		      "<i class='glyphicon glyphicon-chevron-right'></i>"
		    ],
		    responsive:{
		        0:{
		            items:2
		        },
		        600:{
		            items:4
		        },
		        1000:{
		            items:8
		        }
		    }

		});
	}


	 /* Contact form ajax Handler
    ================================================*/
    $("body").on("submit", ".ajax-form", function(){
      event.preventDefault();
      var form = $(this);
      var formData = $(form).serialize();
      var formMessages = $(".form-messages");
      $.ajax({
            type: "POST",
            url: $(form).attr("action"),
            data: formData,
            dataType: "json"
        }).done(function(response){
          console.log(response);
            $(form).text(response);
        }).fail(function(data){
             // Make sure that the formMessages div has the 'error' class.
            // Set the message text.
            if (data.responseText !== '') {
                $(form).text(data.responseText);
            } else {
                $(form).text('Oops! An error occured and your message could not be sent.');
            }
        })
        $(form)[0].reset();
    })

  $(".form-btn").on("click", function(){
    var form = this.classList[2];
    var modal = document.getElementById(form);
    $(modal).show();
  })





    /*
	On scroll animations
	================================================
	*/


    var $elems = $('.animate-onscroll');

    var winheight = $(window).height();
    var fullheight = $(document).height();
 
    $(window).scroll(function(){
        animate_elems();
    });



    function animate_elems() {

	    wintop = $(window).scrollTop(); // calculate distance from top of window
	 
	    // loop through each item to check when it animates
	    $elems.each(function(){
	    	
	      $elm = $(this);
	 
	      if($elm.hasClass('animated')) { return true; } // if already animated skip to the next item
	 
	      topcoords = $elm.offset().top; // element's distance from top of page in pixels
	 
	      if(wintop > (topcoords - (winheight*.75))) {
	        // animate when top of the window is 3/4 above the element
	        $elm.addClass('animated');
	      }

	    });

	  } // end animate_elems()

	


 	/*  Google map Script
 	====================================================*/ 

	function initMap() {

  		
  		var mapLatitude = 31.423308 ; // Google map latitude 
  		var mapLongitude = -8.075145 ; // Google map Longitude  

	    var myLatlng = new google.maps.LatLng( mapLatitude, mapLongitude );

	    var mapOptions = {

	            center: myLatlng,
	            mapTypeId: google.maps.MapTypeId.ROADMAP,
	            zoom: 10,
	            scrollwheel: false
	          };   

	    var map = new google.maps.Map(document.getElementById("contact-map"), mapOptions);

	    var marker = new google.maps.Marker({
	    	
	      position: myLatlng,
	      map : map,
	      
	    });

	    // To add the marker to the map, call setMap();
	    marker.setMap(map);

	    // Map Custom style
	    var styles = [
		  {
		    stylers: [
		      { hue: "#1f76bd" },
		      { saturation: 80 }
		    ]
		  },{
		    featureType: "road",
		    elementType: "geometry",
		    stylers: [
		      { lightness: 80 },
		      { visibility: "simplified" }
		    ]
		  },{
		    featureType: "road",
		    elementType: "labels",
		    stylers: [
		      { visibility: "off" }
		    ]
		  }
		];

		map.setOptions({styles: styles});

	};

	if( $("#contact-map").length > 0 ) {

		initMap();
		
	}

  // Teams page - open a bio for each member

  $(".member-name").on("click", function(){
    var id = this.id;
    $(".bio-"+id).show();
  })

  $(".close").on("click", function(){
    $(".modal").hide();
  })
  // Video modal

  $(".video-btn").on("click", function(){
    $(".video-content").empty();
    $(".video-content").html(loadVideo(this));
    $(".video-modal").show();
    $("body").css("overflow", "hidden");
  })

  $(".video-close").on("click", function(){
    $(".video-modal").hide();
    $("body").css("overflow", "scroll");
  })

  function loadVideo(video){
    return `<center><iframe src="${video.dataset["link"]}" \
    width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen>\
    </iframe></center>`
  }

  $(window).on("load", function(){
    var width = $(".video-btn").width();
    var height = $(".video-btn").height();
    $(".panel").css("width", width);
    $(".panel").css("height", height);
  })
  $(".video-btn").mouseenter(function(){
    var panel = $(this).next(".panel");
    $(panel).slideDown("slow");
    $(panel).mouseleave(function(){
      $(panel).slideUp("slow");
    })
  });

});





		

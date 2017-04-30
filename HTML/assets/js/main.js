    $(".ajax-form").on("submit", function(){
      event.preventDefault();
      var form = $(this);
      var formData = $(".ajax-form").serialize();
      var formMessages = $(".form-messages");
      $.ajax({
            type: "POST",
            url: $(form).attr("action"),
            data: formData,
            dataType: "json"
        }).done(function(response){
            $(formMessages).removeClass('error');
            $(formMessages).addClass('success');

            $(formMessages).text(response);

            $(".ajax-form")[0].reset();
        }).fail(function(data){
             // Make sure that the formMessages div has the 'error' class.
            $(formMessages).removeClass('success');
            $(formMessages).addClass('error');

            // Set the message text.
            if (data.responseText !== '') {
                $(formMessages).text(data.responseText);
            } else {
                $(formMessages).text('Oops! An error occured and your message could not be sent.');
            }
        })

    })


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
    $("body").on("submit", ".ajax-form",  function(){
      event.preventDefault();
      var form = $(this);
      var formData = $(".ajax-form").serialize();
      var formMessages = $(".form-messages");
      $.ajax({
            type: "POST",
            url: $(form).attr("action"),
            data: formData,
            dataType: "json"
        }).done(function(response){
            $(formMessages).removeClass('error');
            $(formMessages).addClass('success');

            $(formMessages).text(response);
        }).fail(function(data){
             // Make sure that the formMessages div has the 'error' class.
            $(formMessages).removeClass('success');
            $(formMessages).addClass('error');

            // Set the message text.
            if (data.responseText !== '') {
                $(formMessages).text(data.responseText);
            } else {
                $(formMessages).text('Oops! An error occured and your message could not be sent.');
            }
        })
        $(form)[0].reset();
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

  $(".form-btn").on("click", function(){
    var form = this.classList[2];
    var modal = document.getElementById(form);
    $(modal).show();
  })

  $("#form-options").on("change", function(){
    $(".form").empty();
    value = this.value;
    $(".form").append(createForm(value));
  })
  function createForm(type){
    switch(type){
      case "host":
        return `<form class="forms"> \
                <label for="name">Name</label> \
                <input type="text" class="name"> \

                <label for="email">Email</label> \
                <input type="email" class="email"> \

                <label for="phone">Phone</label> \
                <input type="text" class="phone"> \

                <label for="event-type">Type of Event</label> \
                <input type="text" class="event-type">\

                <label for="location">Location</label> \
                <input type="text" class="location">\

                <label for"date">Date</label> \
                <input type="text" class="date" placeholder="mm/dd/year - mm/dd/year"> \

                <label for="idea">Tell us about your idea and what help you need</label> \
                <textarea class="idea"></textarea>\

                <label for="message">Message</label> \
                <textarea class="message"></textarea> \

                <button type="submit" class="submit-btn">Submit</button> \
                </form>`
        break;
        case "volunteer":
        return `<form class="forms"> \
                <label for="name">Name</label> \
                <input type="text" class="name"> \

                <label for="email">Email</label> \
                <input type="email" class="email"> \

                <label for="phone">Phone</label> \
                <input type="text" class="phone"> \

                <label for="opportunity-type">Type of Oppotunity</label> \
                <select class="opportunity-options"> \
                <option value=""></option> \
                <option value="country">In Country</option> \
                <option value="course-credit">Course Credit</option> \
                <option value="internship">Internship</option> \
                <option value="virtual">Virtual</option> \
                <option value="research">Research</option>\
                </select> \

                <label for="spanish">Do you speak spanish</label> \
                <select class="spanish"> \
                <option value=""></option>\
                <option value="yes">Yes</option>\
                <option value="no">No</option> \
                </select>\

                <label for="fluent">If yes, what is your level?</label> \
                <select class="fluent"> \
                <option value=""></option>\
                <option value="beginner">Beginner</option>\
                <option value="intermediate">Intermediate</option>\
                <option value="fluent">Fluent</option>\
                </select>\


                <label for="date">Date</label> \
                <input type="text" class="date" placeholder="mm/dd/year - mm/dd/year">\

                <label for="message">Message</label> \
                <textarea class="message"></textarea> \

                <button type="submit" class="submit-btn">Submit</button> \
                </form>`
        break;
        case "fundraise":
        return `<form class="forms"> \
                <label for="name">Name</label> \
                <input type="text" class="name"> \

                <label for="email">Email</label> \
                <input type="email" class="email"> \

                <label for="phone">Phone</label> \
                <input type="text" class="phone"> \

                <label for="type">Type</label> \
                <select class="type"> \
                <option value=""></option> \
                <option value="party">Party</option> \
                <option value="event">Event</option> \
                <option value="crowdsourcing">crowdsourcing</option> \
                </select> \

                <label for="location">Location</label> \
                <input type="text" class="location"> \

                <label for"date">Date</label> \
                <input type="text" class="date" placeholder="mm/dd/year - mm/dd/year"> \

                <label for="message">Message</label> \
                <textarea class="message"></textarea> \

                <button type="submit" class="submit-btn">Submit</button> \
                </form>`
        break;
        case "partner":
        return `<form class="forms"> \
                <label for="name">Name</label> \
                <input type="text" class="name"> \

                <label for="email">Email</label> \
                <input type="email" class="email"> \

                <label for="phone">Phone</label> \
                <input type="text" class="phone"> \

                <label for="partner-name">Name of Partner</label> \
                <input type="text" class="partner-name">

                <label for="choice">Partner Type</label> \
                <select class="choice"> \
                <option value=""></option> \
                <option value="organization">Nonprofit/organization</option> \
                <option value="individual">Financial/individual</option> \
                </select> \

                <label for="message">Message</label> \
                <textarea class="message"></textarea> \

                <button type="submit" class="submit-btn">Submit</button> \
                </form>`
        break;
    }
  }

});





		

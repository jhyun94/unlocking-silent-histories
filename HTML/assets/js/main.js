		
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

    $(".ajax-form").on('submit', function() {
    	var form = $(this);
        var formURL = $(this).attr("action");
        var postData = $(this).serializeArray();

        $.ajax({
            url: formURL,
            type: 'POST',
            data: postData,
            dataType: 'json',

            success:function(data, textStatus, jqXHR){

                if(data.success==1){

                    form.find(".alert").fadeOut();
                    form.find(".alert-success").html(data.message);
                    form.find(".alert-success").fadeIn(600);
                    

                }else{

                	form.find(".alert").fadeOut();
                    form.find(".alert-danger").html(data.message);
                    form.find(".alert-danger").fadeIn(600);

                }
            },

            error: function(jqXHR, textStatus, errorThrown)  { 
                
                console.log(errorThrown);
            }

        });
            

        return false;
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
    $(".modal").show();
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
    }
  }
});





		

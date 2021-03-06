// Main JavaScript File

// After page load
$(function() {
	var h1 = $('#time')[0],
	fatal = $('#fatal')[0],
	fatalText = $('#fatalText')[0],
    seconds = 0, minutes = 0, death = 0,
    t;

	function add() {
	    seconds++;
	    if (seconds >= 60) {
	        seconds = 0;
	        minutes++;

	        if(minutes%2==0){
	        	death++;
	        	fatalText.style.visibility = "visible";
	        }
   		 }
   		 h1.textContent = (minutes ? (minutes > 9 ? minutes : minutes) : "0") + " minutes " + (seconds > 9 ? seconds : seconds) + " seconds";
    	     	    	 fatal.textContent = death>0 ? (death ==1 ? death + " person is " : death + " people are") : 0;
    	 timer();
	}

	function timer() {
    	t = setTimeout(add, 1000);
	}

	timer();

	var maxTime = 2000; // 2 seconds
	var time = 0;

	function isScrolledIntoView(elem) {
	    var docViewTop = $(window).scrollTop();
	    var docViewBottom = docViewTop + $(window).height();
	    var elemTop = $(elem).offset().top;
	    var elemBottom = elemTop + $(elem).height();
	    return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) && (elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	}

	$(window).scroll(function() {    
	    if(isScrolledIntoView($('#typed')))
	    {
       		$("#typed").typed({
		     	stringsElement: $('#typed-strings'),
		     	backSpeed: -50,
		    	showCursor: false
	        });

	        $("#typed").css({
	        	  "-webkit-animation-duration": "50s",
  			      "-webkit-animation-name": "changeImg"
	        });
	    }    
	});

});

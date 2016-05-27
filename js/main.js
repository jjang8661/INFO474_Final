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

});

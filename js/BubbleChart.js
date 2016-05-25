var BubbleChart = function() {

	// Assign default values for each variables.	
	var diameter = 800,
		width = 200,
	 	height = 200;

	// Chart function to draw the bubble chart 	
    var bbChart = function(selection) {

	    // Loop thorough the selection in case of more than one selection
    	selection.each(function(data) {
	   		var div = d3.select(this);

	   		// Set svg for showing all bubbles
			var svg = div.append("svg")
		 		   .attr("width", width)
		 		   .attr("height", height)
		 		   .attr("class","bubble");

			var circle = svg.selectAll("circle").data(data,function(d) {return d.id});
			  
			circle.enter().append("circle")
		  			 .attr("r","0")
		  			 .style("fill","white");

		    circle.exit().remove();

            circle.transition()
             .duration(1000)
			 .attr("r", diameter%50)
			 .attr("transform", function(d) { return "translate(100,100)"; })
			 .style("fill",'aliceblue');


		    // Bind text with data and update it
			var text = svg.selectAll("text")
			       .data(data, function(d) {return d.id}); 

			text.enter().append("text")
			  	        .style("fill","white");

			text.exit().remove();

 			text.transition()
 			 .duration(1000)
			 .style("text-anchor", "middle")
			 .attr("dy", ".3em")
			 .attr("transform", function(d) { return "translate(100,100)"; })
			 .style("fill","black")	
			 .text(function(d){ return d.text;})	 		


    	});

    }

    // Set diameter of bubble chart (The area where all the bubbles are created)
	bbChart.diameter = function(val) {
 		if (!arguments.length) return diameter;
 		diameter = val;
		return this;
	}

	// Set the width of the svg
	bbChart.width = function(val) {
 		if (!arguments.length) return width;
 		width = val;
		return this;
	}

	// Set the hight of the svg
	bbChart.height = function(val) {
 		if (!arguments.length) return height;
 		height = val;
		return this;
	}

return bbChart;
}
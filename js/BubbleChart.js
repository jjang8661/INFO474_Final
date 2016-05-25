var BubbleChart = function() {

	// Assign default values for each variables.	
	var diameter = 800,
		width = 800,
	 	height = 800;

	// Chart function to draw the bubble chart 	
    var bbChart = function(selection) {

	    // Loop thorough the selection in case of more than one selection
    	selection.each(function(data) {
	   		var div = d3.select(this);

	   		// Set svg for showing all bubbles
			var svg = div.selectAll(".bubble").data(data,function(d) {return d.id});
			    svg.enter().insert("svg")
		 		   .attr("width", width)
		 		   .attr("height", height)
		 		   .attr("class","bubble");

			    svg.exit().remove();

			var circle = svg.selectAll("circle").data(data,function(d) {return d.id});
			  
			circle.enter().insert("circle")
		  			 .attr("r","0")
		 			 .attr("transform", function(d) { return "translate(300,100)"; })
		  			 .style("fill","white");

		    circle.exit().remove();

            circle.transition()
             .duration(1000)
			 .attr("r", diameter/2)
			 .style("fill",'aliceblue');


		    // Bind text with data and update it
			var text = svg.selectAll("text")
			       .data(data, function(d) {return d.id}); 

			text.enter().append("text")
    					.attr("transform", function(d) { return "translate(300,100)"; })
			  	        .style("fill","white");

			text.exit().remove();

 			text.transition()
 			 .duration(1000)
			 .style("text-anchor", "middle")
			 .attr("dy", ".3em")
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
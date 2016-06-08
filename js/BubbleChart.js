var BubbleChart = function() {

	// Assign default values for each variables.	
	var diameter = 600,
		width = 600,
	 	height = 600,
	    colorScale = ['#DADFE1', '#868a8b'],// drunk red('#F22613',  ), gray for victim, dark gray for affected1
	    textColor = 'BLACK',
	    diffColor = 1;
	var variableName, valueName;

	// Chart function to draw the bubble chart 	
    var chart = function(selection) {

	    // Loop thorough the selection in case of more than one selection
    	selection.each(function(data) {
			var bubble = d3.layout.pack()
				.size([width, height])
				.padding([5])
				.value(function(d) { return d.val;});

	   		var div = d3.select(this);

	   		//convert given data to hiearchical form
			var newData = bubble.nodes(dataToNode(data))
				.filter(function(d) {return !d.children;});

	   		// Set svg for showing all bubbles


			var svg = div.selectAll(".bubble").data("1");
			   svg.enter().append("svg")
		 		   .attr("width", width)
		 		   .attr("height", height)
		 		   .attr("class","bubble");

		       svg.exit().remove();


			var circle = svg.selectAll("circle").data(newData);
		    


			circle.enter().append("circle")
		  			 .attr("r","0")
		 			 .attr("transform", function(d) { return "translate("+newData[0].x+","+newData[0].y+")"; })
		  			 .style("fill","white");


            circle.transition()
             .duration(function(d){return d.id * (2000/data.length);})
			.attr('transform', function(d) {return 'translate (' + d.x + ',' + d.y+ ')'; })
			.attr('r', 50)
			 .style("fill",function(d){
			 	if (d.id <= diffColor) {
			 		return colorScale[0];
			 	} else {
			 		return colorScale[1];
			 	}
			 });


			 			circle.append('text')
					.attr('x', function(d){return d.x;})
					.attr('y', function(d) {return d.y})
					.text(function(d){return d.varName})
					.style("text-anchor", "middle")
					.style('fill' , textColor)
					.style('font-size', function(d){return (d.r)/5});

							    circle.exit().remove();

		    // Bind text with data and update it
			/*var text = circles.append('text')
					.attr('x', function(d){return d.x;})
					.attr('y', function(d) {return d.y})
					.text(function(d){return d.varName})
					.style("text-anchor", "middle")
					.style('fill' , textColor)
					.style('font-size', function(d){return (d.r)/5});
				.attr('transform', function(d) {return 'translate (' + d.x + ',' + d.y+ ')'; })
	  	        .style("fill",textColor);

 			text.transition()
 			 .duration(1000)
			.attr('x', function(d){return d.x;})
			.attr('y', function(d) {return d.y;})
			.text(function(d){return d.varName;})
			.style("text-anchor", "middle")
			.style('fill' , textColor)
			.style('font-size', 20);	*/


    	});

    }

	//Change dataset to Nodes 
	var dataToNode = function(data) {
		var nodeSet = [];
		var i = 1;
		data.forEach(function(d) {
			nodeSet.push({id: i, varName: d[variableName], val: d[valueName]})

		i++;
		})

		return {children: nodeSet};
	}

    // Set diameter of bubble chart (The area where all the bubbles are created)
	chart.diameter = function(val) {
 		if (!arguments.length) return diameter;
 		diameter = val;
		return this;
	}

	// Set the width of the svg
	chart.width = function(val) {
 		if (!arguments.length) return width;
 		width = val;
		return this;
	}

	// Set the hight of the svg
	chart.height = function(val) {
 		if (!arguments.length) return height;
 		height = val;
		return this;
	}

	chart.numDiffColor = function(val) {
 		if (!arguments.length) return diffColor;
 		diffColor = val;
		return this;
	}
	
	//a method to update the color
	chart.colorScale = function(value) {
		if(!arguments.length) return colorScale; // return the current color if not provided
		colorScale = value; //set color to new value
		return this; //return the new object to allow method chaining
	};
	//Method to select/change the name of the variable that will be labeled on the circle.
	chart.variableName = function(value) {
		if(!arguments.length) return variableName; // return the current variableName if not provided
		variableName = value; //set variableName to new value
		return this; //return the new object to allow method chaining
	};

	//select/change the name of value that will change the size of each bubble. 
	chart.valueName = function(value) {
		if(!arguments.length) return valueName; // return the current valueName if not provided
		valueName = value; //set valueName to new value
		return this; //return the new object to allow method chaining
	};



return chart;
}
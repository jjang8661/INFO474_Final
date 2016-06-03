//	A function PieChart that is the reusable function
var PieChart = function() {
	//	Variables inside the function scope to track 
	//			width, height, radius, colorRange, category, and category_values
	//	Default values are given
	var width = 910,
		height = 450,
		radius = Math.min(width, height) / 2,
		colorRange = [],
		category = 'title',
		category_values = 'value';

	var outerRadius = height / 2 - 20,
	    innerRadius = outerRadius / 3,
	    cornerRadius = 10;

	//	Chart function to be returned by the PieChart function.
	//	Parameter taken in represents your selection
	var chart = function(selection) {
		selection.each(function(data) {

			//	Sets the color range
			var color = d3.scale.ordinal()
					.range(colorRange);

			//	Sets the inner and outer radius arcs of the pie chart and donut hole
			var arc = d3.svg.arc()
				.outerRadius(radius - 10)
				.innerRadius(innerRadius)
				.padRadius(outerRadius)

			//	Sets the inner and outer radius arcs for the category labels in the pie chart
			var labelArc = d3.svg.arc()
							.outerRadius(radius - 60)
							.innerRadius(radius - 85);

			//	Constructs a pie layout using the values of what category_value refers to
			var pie = d3.layout.pie()
							.padAngle(.02)
							.sort(null)
							.value(function(d) {return d[category_values]; });

			//	Selects 'this' element to render the chart and appends an svg and g
			var svg = d3.select(this).append("svg")
					.attr("width", width)
					.attr("height", height)
					.append("g")
					.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

			//	Selects all of the .arc elements inside the svg and binds the data
			var g = svg.selectAll(".arc").data(pie(data));

			//	New g elements entered
			g.enter()
			 .append("g")
			 .attr("class", "arc");


			//	New path elements are appended
			g.append("path")
				.attr("d", arc)
				.on('mouseover', function(d) {return d.data[category_values]; })
				.style("fill", function(d) {return color(d.data[category]); });

			//	New text elements are appended
			g.append("text")
				.attr("transform", function(d) {return "translate(" + labelArc.centroid(d) + ")"; })
				.attr("dy", ".35em")
				.text(function(d) {return d.data[category]; });

			//	Elements exit
			g.exit().remove();
		})

	};

	//	A method that updates the width
	chart.width = function(value) {
		if(!arguments.length) {
			return width;
		}
		width = value;
		return this;
	};

	//	A method that updates the height
	chart.height = function(value) {
		if(!arguments.length) {
			return height;
		}
		height = value;
		return this;
	};

	//	A method that updates the radius
	chart.radius = function(value) {
		if(!arguments.length) {
			return radius;
		}
		radius = value;
		return this;
	};

	//	A method that updates the colorRange
	//				(takes in an array)
	chart.colorRange = function(value) {
		if(!arguments.length) {
			return colorRange;
		}
		colorRange = value;
		return this;
	};

	//	A method that updates the category
	chart.category = function(value) {
		if(!arguments.length) {
			return category;
		}
		category = value;
		return this;
	};

	//	A method that updates the category_values
	chart.category_values = function(value) {
		if(!arguments.length) {
			return category_values;
		}
		category_values = value;
		return this;
	};

	//	Returns the chart object
	return chart;
}
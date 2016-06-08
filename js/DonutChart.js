//	A reusable donut chart
var DonutChart = function() {

	//	Default values assigned
	var width = 910,
		height = 450,
		radius = Math.min(width, height) / 2;

	var colorRange = ['red'],
		fontSize = radius / 4;

	var	innerRadius = radius / 2.2;

	//	Chart function that draws the donut
	var chart = function(selection) {
		selection.each(function(data) {

			//	Sets the color to the colorRange that will be used
			var color = d3.scale.ordinal()
						.range(colorRange);

			//	Sets the radius of the arcs of the donut
			var arc = d3.svg.arc()
				.outerRadius(radius)
				.innerRadius(innerRadius)

			//	Sets the pie to slices with padAngles
			var pie = d3.layout.pie()
				.padAngle(.02)
				.sort(null)
				.value(function(d) { return d.value; } );

			//	Sets svg to append the g elements
			var svg = d3.select(this).append("svg")
				.attr("width", width)
				.attr("height", height)
				.append("g")
				.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
		
			//	Binds the data
			var g = svg.selectAll(".arc").data(pie(d3.entries(data)));
			

			//	New g elements entered
			g.enter()
				.append("g")
				.attr("class", "arc");

			g.append("path")
				.attr("d", arc)
				.style("fill", function(d) { return color(d.data.key); });

			//	Appends the text of data keys (categories)
			g.append("text")
				.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
				.attr("dy", ".35em")
				.text(function(d) { return d.data.key; });

			//	Appends text in the middle
			svg.append("text")
				.datum(data)
				.attr("x", 0)
				.attr("y", 0 + radius / 10)
				.attr("class", "text-tooltip")
				.style("text-anchor", "middle")
				.attr("font-weight", "bold")
				.style("font-size", fontSize + "px");

			//	Removes g elements
			g.data(pie(d3.entries(data))).exit().remove();

			//	On "mouseover", the values will show in the center of the donut
			g.on("mouseover", function(obj) {
				svg.select("text.text-tooltip")
					.attr("fill", function(d) { return color(obj.data.key); })
					.text(function(d) { return d[obj.data.key]; 
				});
			});

			//	On "mouseout", the center of the donut will be blank
			g.on("mouseout", function(obj) {
				svg.select("text.text-tooltip").text("");
			});
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

	//	A method that updates the radius for manual setting
	chart.radius = function(value) {
		if(!arguments.length) {
			return radius;
		}
		radius = value;
		return this;
	};

	//	A method that updates the fontSize of the text
	//	inside the donut
	chart.fontSize = function(value) {
		if(!arguments.length) {
			return fontSize;
		}
		fontSize = value;
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

	return chart;
}
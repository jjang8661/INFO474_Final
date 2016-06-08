var DonutChart = function() {

var width = 910,
	height = 450,
	radius = Math.min(width, height) / 2;

var colorRange = ['red'],
	fontSize = radius / 4;

var	innerRadius = radius / 2.2;

var category = 'title',
	category_values = 'value';

var chart = function(selection) {
	selection.each(function(data) {

		var color = d3.scale.ordinal()
					.range(colorRange);

		var arc = d3.svg.arc()
			.outerRadius(radius)
			.innerRadius(innerRadius)

		var pie = d3.layout.pie()
			.padAngle(.02)
			.sort(null)
			.value(function(d) { return d[category_values]; } );

		var svg = d3.select(this).append("svg")
			.attr("width", width)
			.attr("height", height)
			.append("g")
			.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
	
		var g = svg.selectAll(".arc").data(pie(d3.entries(data)));
			

		//	New g elements entered
		g.enter()
			.append("g")
			.attr("class", "arc");

		g.append("path")
			.attr("d", arc)
			.style("fill", function(d) { return color(d.data.key); });

		g.append("text")
			.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
			.attr("dy", ".35em")

		g.select("text")
			.text(function(d) { return d.data.key; });

		svg.append("text")
			.datum(data)
			.attr("x", 0)
			.attr("y", 0 + radius / 10)
			.attr("class", "text-tooltip")
			.style("text-anchor", "middle")
			.attr("font-weight", "bold")
			.style("font-size", fontSize + "px");

		g.on("mouseover", function(obj) {
			svg.select("text.text-tooltip")
				.attr("fill", function(d) { return color(obj.data.key); })
				.text(function(d) { return d[obj.data.key]; 
			});
		});

		g.on("mouseout", function(obj) {
			svg.select("text.text-tooltip").text("");
		});

		g.data(pie(d3.entries(data))).exit().remove();

		g.select("text")
			.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; });

		return chart;
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

  return chart;

}
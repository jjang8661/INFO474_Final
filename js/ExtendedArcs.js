//	A function that is a reusable Extended Arcs
var ExtendedArcs = function() {

//	Variables used to construct the extended arcs 
var width = 960,
	height = 500,
	outerRadius = height / 2 - 20,
	innerRadius = outerRadius / 3,
	cornerRadius = 10;

	//	Chart function to be returned by the PieChart function.
	//	Parameter taken in represents your selection
	var chart = function(selection) {
		selection.each(function(data) {

			var pie = d3.layout.pie()
				.padAngle(.02);

			var arc = d3.svg.arc()
				.padRadius(outerRadius)
				.innerRadiu(innerRadius);

			//	Selects 'this' element to render the chart and appends an svg and g
			var svg = d3.select(this).append("svg")
					.attr("width", width)
					.attr("height", height)
					.append("g")
					.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

			svg.selectAll("path")
				.data(pie(data))
					.enter().append("path")
					.each(function(d) {d.outerRadius = outerRadius - 20;} )
					.att("d", arc)
					.on("mouseover", arcTween(outerRadius, 0))
					.on("mouseout", arcTween(outerRadius - 20, 150));

			var arcTween = function(outerRadius, delay) {
				d3.select(this).transition().delay(delay).attrTween("d", function(d) {
					var i = d3.interpolate(d.outerRadius, outerRadius);
					return function(t) {d.outerRadius = i(t); return arc(d);};
				});
			};
		})
	};
}
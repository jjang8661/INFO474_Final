$(function() {

	var data = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

	var myChart = ExtendedArcs();
	var chartWrapper = d3.select('#pieDiv')
		.datum(data)
		.call(myChart);
});
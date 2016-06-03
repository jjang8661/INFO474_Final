$(function() {

	var data = [
	{title: 'Drunk Driver', value: 6391},
	{title: 'Drunk Driver Passenger', value: 1511},
	{title: 'Other Vehicle Occupants', value: 1241},
	{title: 'Non-Occupants', value: 824}
	];

	var myChart = PieChart();
	var chartWrapper = d3.select('#pieDiv')
		.datum(data)
		.call(myChart);
});
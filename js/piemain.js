$(function() {

	var data = [
	{title: 'Drunk Driver', value: 6391},
	{title: 'Passenger with Drunk Driver', value: 1511},
	{title: 'Occupants of Other Vehicles', value: 1241},
	{title: 'Nonoccupants', value: 824}
	];

	var myChart = PieChart();
	var chartWrapper = d3.select('#pieDiv')
		.datum(data)
		.call(myChart);
});
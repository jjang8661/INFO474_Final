$(function() {

  var data = {};
    data["Drunk Driver"] = 6391;
    data["Passengers"] = 1511;
    data["Other Vehicle"] = 1241;
    data["Non-Occupants"] = 824;
  
	var myChart = DonutChart();
	var chartWrapper = d3.select("#pieDiv")
	              .datum(data)
	              .call(myChart);
});
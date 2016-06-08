$(function() {

  var data = {};
    data["Drunk Driver"] = 6391;
    data["Drunk Passenger"] = 1511;
    data["Other Vehicle"] = 1241;
    data["Non-Occupants"] = 824;
    
	// var data = [6391, 1511, 1241, 824]
	// var text = "Drunk Driver"

var myChart = DonutChart();
var chartWrapper = d3.select("#pieDiv")
              .datum(data)
              .call(myChart);
});
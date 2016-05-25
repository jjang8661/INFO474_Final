
var myApp = angular.module('myApp', [])

// Main controller
.controller('MainController', function($scope) {
     // Data for the chart
     $scope.data = [
       {id:0, text:'Paragraph 0',diameter: 1443},
       {id:1, text:'Paragraph 1',diameter: 2132},
       {id:2, text:'Paragraph 2',diameter: 3234},
       {id:3, text:'Paragraph 3',diameter: 5432}
     ];

     // Array of objects that correspond to each step
     $scope.settings = [
       {diameter: 1443,filter:function(d){return d.id == 0}},
       {diameter: 2132,filter:function(d){return d.id == 1}},
       {diameter: 3234,filter:function(d){return d.id == 2}},
       {diameter: 5432,filter:function(d){return d.id == 3}}
     ];

     $scope.step = 0;

     // Text for each section
     $scope.sectionSet = [
       {text:'Section 0',color:'yellow'},
       {text:'Section 1',color:'royalblue'},
       {text:'Section 2',color:'orange'},
       {text:'Section 3',color:'red'}
     ];

     // Desired section height
     $scope.sectionHeight = 800;

 })

// Projects controller
.controller('ProjectsController', function($scope, ProjectData){
  ProjectData.then(function(data){
    $scope.projects = data
  })
})

// Scroll directive
.directive("scroll", function ($window) {
    return {
      restrict:'E', // this directive is specified as an html element <scroll>
      scope:false, // use global scope
      // Create a link function that allows dynamic element creation
      link:function(scope, elem) {
      	// console.log('test')
          angular.element($window).bind("scroll", function() {
              scope.step = Math.ceil(($(window).scrollTop() - $("scroll.scroller").offset()["top"])/scope.sectionHeight);
              scope.$apply();
         
          });
      }
    };
})


.directive('bubbleChart', function($filter, $compile) {
	// Return your directive element
	return {
		restrict:'E', 
    scope:false,
		// Create a link function that allows dynamic element creation
		link:function(scope,elem,attrs){
			// Use the scope.$watch method to watch for changes to the step, then re-draw your chart
			scope.$watch('step', function() {

        // Instantiate your chart with given settings
        var diameter = scope.settings[scope.step].diameter;
        var myChart = BubbleChart().diameter(diameter);

        // Get the current data
        var currentData = scope.data.filter(scope.settings[scope.step].filter);
        console.log(currentData)
        console.log(scope.step)
  			// Wrapper element to put your svg (chart) in
  			wrapper = d3.select(elem[0])
          .datum(currentData)
          .call(myChart);
			});
		}
	};
});


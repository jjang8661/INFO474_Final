
var myApp = angular.module('myApp', [])

// Main controller
.controller('MainController', function($scope) {
     // Data for the chart
     $scope.data = [
       {id:0, text:'Bubble 1'},
       {id:1, text:'Bubble 2'},
       {id:2, text:'Bubble 3'},
       {id:3, text:'Bubble 4'}
     ];

     // Array of objects that correspond to each step
     $scope.settings = [
       {diameter: 84,filter:function(d){return d.id == 0}},
       {diameter: 113,filter:function(d){return d.id == 1}},
       {diameter: 223,filter:function(d){return d.id == 2}},
       {diameter: 343,filter:function(d){return d.id == 3}}
     ];

     $scope.step = 0;

     // Text for each section
     $scope.sectionSet = [
       {text:'On March 28, 2014,22-year-old Michael Collins spent the evening out with friends at a spring formal near campus – he was just weeks away from graduating with a degree in exercise science from Illinois State University',color:'yellow'},
       {text:'In the early hours of March 29th, Michael and his friends were picked up by a designated driver and were on their way home, when a drunk driver ran a red light and struck the vehicle Michael was riding in. Michael sustained severe head trauma and was rushed into emergency brain surgery.',color:'royalblue'},
       {text:'After four days of fighting for his life, Michael succumbed to his injuries on April 2nd.',color:'orange'},
       {text:'Section 4',color:'red'}
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
        // var currentData = scope.data.filter(scope.settings[scope.step].filter);
        var currentData = scope.data.filter(function(d){ return d.id == scope.step});

        console.log(currentData)
  			// Wrapper element to put your svg (chart) in
  			wrapper = d3.select(elem[0])
          	.datum(currentData)
          	.call(myChart);
			});
		}
	};
});


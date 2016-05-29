var myApp = angular.module('myApp', [])

// Main controller
.controller('MainController', function($scope) {

    $scope.data = [
      {id: 1, color: '#FFFFF7'},
      {id: 2, color: '#FFFFF7'},
      {id: 3, color: '#FFFFF7'},
      {id: 4, color: '#FFFFF7'}
    ];

     // Array of objects that correspond to each step
     $scope.settings = [
       {numD: 0, filter:function(d){return d.id == 1}},
       {numD: 1, filter:function(d){return d.id == 1}},
       {numD: 27, filter:function(d){return d.id == 2}},
       {numD: 1750, filter:function(d){return d.id == 3}}, //9000 is too big and cause lagging
       {numD: 300, filter:function(d){return d.id == 4}}
     ];

     $scope.step = 0;
     $scope.sectionSet = [
       {text:'1 person is injured every 53 minutes in a drunk driving incident',color:'#E0E0E0'},
       {text:'27 people are injured or killed per day in a drunk driving incident',color:'#D0D0D0'},
       {text:'9,967 people are either injured or killed each year in a drunk driving incident',color:'#C0C0C0'},
       {text:'Section 3',color:'#A0A0A0'},
       {text:'Section 4',color:'#A0A0A0'}
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
          angular.element($window).bind("scroll", function() {
              scope.step = Math.ceil(($(window).scrollTop() - $("scroll.scroller").offset()["top"])/scope.sectionHeight);
              scope.$apply();
         
          });
      }
    };
})

// Create a directive 'scatter' that creates scatterplots
.directive('dots', function($filter, $compile) {
  // Return your directive element
  return {
    restrict:'E', // this directive is specified as an html element <scatter>
      scope:false,
    // Create a link function that allows dynamic element creation
    link:function(scope,elem,attrs){
      // Use the scope.$watch method to watch for changes to the step, then re-draw your chart
      scope.$watch('step', function() {

        // Instantiate your chart with given settings
        var numDots = scope.settings[scope.step].numD;
        var myChart = Dots().numNodes(numDots).color('#303030');

        // Get the current data
        var currentData = scope.data.filter(scope.settings[scope.step].filter);

        // Wrapper element to put your svg (chart) in
    wrapper = d3.select(elem[0])
              .datum(currentData)
              .call(myChart);
      });
    }
  };
});
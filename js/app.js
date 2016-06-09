var myApp = angular.module('myApp', [])

// Main controller
.controller('MainController', function($scope) {

    // Desired section height
    $scope.sectionHeight = 800;
    $scope.data = [
      {id: 0, color: '#DADFE1'},
      {id: 1, color: '#DADFE1'},
      {id: 2, color: '#DADFE1'},
      {id: 3, color: '#DADFE1'},
      {id: 4, color: '#F22613'},
      {id: 5, color: '#DADFE1'},
      {id: 6, color: '#DADFE1'},
      {id: 7, color: '#DADFE1'}
    ];

     // Array of objects that correspond to each step
     $scope.settings = [
     {numD: 0, filter:function(d){return d.id == 0}},
     {numD: 784, filter:function(d){return d.id == 1}},    //every 
     {numD: 112, filter:function(d){return d.id == 2}},  //day
     {numD: 1, filter:function(d){return d.id == 3}}, //week
     [{numD: 1, person:'Michael', filter:function(d){return d.id == 5}}], //for part where it says "the number we see might be"
     [     {numD: 1, person:'Michael', filter:function(d){return d.id == 5}}, //for part where it says "the number we see might be"
           {numD: 1, person:'mom', filter:function(d){return d.id == 6}}],
     [     {numD: 1, person:'Michael', filter:function(d){return d.id == 5}}, //for part where it says "the number we see might be"
           {numD: 1, person:'mom', filter:function(d){return d.id == 6}},
           {numD: 1, person:'dad', filter:function(d){return d.id == 6}},
           {numD: 1, person:'brother', filter:function(d){return d.id == 6}},
           {numD: 1, person:'sister', filter:function(d){return d.id == 6}},
           {numD: 1, person:'Uncle', filter:function(d){return d.id == 6}},
           {numD: 1, person:'friends', filter:function(d){return d.id == 6}},
           {numD: 1, person:'friends', filter:function(d){return d.id == 6}},
           {numD: 1, person:'friends', filter:function(d){return d.id == 6}},
           {numD: 1, person:'friends', filter:function(d){return d.id == 6}},
           {numD: 1, person:'friends', filter:function(d){return d.id == 6}},
           {numD: 1, person:'friends', filter:function(d){return d.id == 6}}], //this is the least number of people that are affected //this is the least number of people that are affected
 //this is the least number of people that are affected //this is the least number of people that are affected
     {numD: 1, radius: 20, filter:function(d){return d.id == 4}}
     ];

     $scope.step = 0;
     $scope.sectionSet = [
       {text:'784 people every week', color:'#000000', sh: 800},
       {text:'112 people each day', color:'#000000', sh: 800},
       {text:'1 person is killed every 13 minutes in a drunk driving incident', color:'#000000', sh: 800},
       {text:'The number we see might be 1', color:'#000000', sh:800},
       {text:'However, the number of people that actually gets affected', color:'#000000', sh:800},
       {text:'is larger', color: '#000000', sh:800},
       {text:'Don\'t drink and drive, arrive alive',color:'#000f30',sh:800}
     ]
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
              console.log(scope.step)
          });
      }
    };
})


.directive('dots', function($filter, $compile) {
  // Return your directive element
  return {
    restrict:'E', // this directive is specified as an html element <scatter>
      scope:false,
    // Create a link function that allows dynamic element creation
    link:function(scope,elem,attrs){
      // Use the scope.$watch method to watch for changes to the step, then re-draw your chart
      scope.$watch('step', function() {
        var myChart;
        var chartWrapper = d3.select(elem[0]);

        if(scope.step <=3) {
        // Instantiate your chart with given settings
          if(scope.settings[scope.step] !== undefined) {
            var numDots = scope.settings[scope.step].numD;
            if (typeof scope.settings[scope.step].radius !== 'undefined') {
              myChart = Dots().numNodes(numDots).color(scope.data[scope.step].color).radiusChange(false).radius(scope.settings[scope.step].radius);
            } else {
              myChart = Dots().numNodes(numDots).color(scope.data[scope.step].color);
            } 
            var currentData = scope.data.filter(scope.settings[scope.step].filter);
            console.log(currentData);
            // Wrapper element to put your svg (chart) in
            chartWrapper.datum(currentData)
                  .call(myChart);

          }
        } 
         if(scope.step <=6 && scope.step >= 3) {
          d3.select('svg').remove();
          myChart = BubbleChart().variableName('person').valueName('numD');
          chartWrapper
            .datum(scope.settings[scope.step])
            .call(myChart);
        }
        // Get the current data
      });
    }
  };
});
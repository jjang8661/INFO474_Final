
var myApp = angular.module('myApp', [])

// Main controller
.controller('MainController', function($scope) {
     // Data for the chart
     $scope.data = [
       {id:0, text:'Paragraph 0'},
       {id:1, text:'Paragraph 1'},
       {id:2, text:'Paragraph 2'},
       {id:3, text:'Paragraph 3'}
     ];

     // Array of objects that correspond to each step
     $scope.settings = [
       {color:'red', fontSize:20, filter:function(d){return d}},
       {color:'blue', fontSize:10, filter:function(d){return d.id>2}},
       {color:'orange', fontSize:100, filter:function(d){return d.id<3}},
       {color:'green', fontSize:30, filter:function(d){return d}},
     ];

     $scope.step = 0;

     // Text for each section
     $scope.sectionText = [
       {text:'Section 0'},
       {text:'Section 1'},
       {text:'Section 2'},
       {text:'Section 3'}
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
              console.log($(window).scrollTop());
              console.log($("scroll.scroller").offset()["top"]);
          });
      }
    };
})


// Define your app
var myApp = angular.module('myApp',[]);

// Define a controller within the app to control a particular area of the DOM
myApp.controller('mainController',['$scope','$filter','$log',
function($scope,$filter,$log){
    // Illustrates the use of ng-model and the $filter module
    $scope.twitterHandle = '';
    $scope.lowercasehandle = function(){
        return $filter('lowercase')($scope.twitterHandle);
    };
    
    // Illustrates the use of ng-if, ng-show and ng-hide
    $scope.characters = 5;
    
    // Illustrates the use of ng-repeat
    $scope.rules = [
        {rulename: 'Must be 5 characters'},
        {rulename: 'Must not be used elsewhere'},
        {rulename: 'Must be cool!'}
    ];
}]);
// Define the application (called in the <html> tag in index.htm)
var myApp = angular.module('myApp',[]);

// Define a controller for a specific part of the DOM in index.htm
myApp.controller('mainController',['$scope','$filter','$log',
function($scope,$filter,$log){
    $scope.twitterHandle = '';
    $scope.lowercasehandle = function(){
        return $filter('lowercase')($scope.twitterHandle);
    };
    
    // $watch tracks the variable (usually done automatically within AngularJS)
    $scope.$watch('twitterHandle', function(newValue,oldValue) {
        $log.info('twitterHandle has changed!');
        $log.info('Old: ' + oldValue);
        $log.info('New: ' + newValue);
    });
    
    // If we use a standard JS function like setTimeout(), AngularJS doesn't automatically 
    // start a digest loop to track the standard function's DOM manipulations, even if the variables
    // are part of $scope
    setTimeout(function(){
        
        // Tell angular that a digest cycle needs to start with $scope.$apply
        $scope.$apply(function(){
            $scope.twitterHandle = 'newTwitterHandle';
            $log.warn('The twitterHandle variable has changed outside the ng-scope');
        });
    },3000);
    // Including the $timeout module avoids the need to user the $scope.$apply function
    // AngularJS is an 'all-in' framework, so you trade off between some control for efficiency
}]);
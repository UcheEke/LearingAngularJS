// We create the '*' of mv* here. This is ng-app in the html file and
// shows that the DOM (view) is linked to the app
var myApp = angular.module('myApp',['ngMessages']);
// Take note of the second parameter in the module() call. This is for dependencies. Consider them
// akin to python modules or c-lang includes. Reference the specific dependency js file from the 
// angularJS.org site and add the relevant name to this second parameter list above.

// All angular.js services begin with a $. scope is the global namespace for angularJS
myApp.controller('mainController', function($scope, $log, $filter){
    // This is now the controller for the view (DOM) aspect with ng-controller='mainController'
    
    // Using dependency injection, we have access to the angularJS services 
    // (all with a $ prefix. Check the angularJS API ref for details)
    // Using the $log service
    $log.log("Hello");
    $log.info("This is some useful information");
    $log.warn("Oops! Warning!");
    $log.debug('Debug information about this code...');
    $log.error('This was an error!!');
    
    // Using the $filter service with scope
    $scope.name='John';
    $scope.formattedname = $filter('uppercase')($scope.name);
    
    $log.info($scope.name);
    $log.info($scope.formattedname);
    
});




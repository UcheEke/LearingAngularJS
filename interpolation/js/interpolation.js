var myApp = angular.module('myApp',[]);

myApp.controller('mainController',[ '$scope', '$timeout', 
function($scope,$timeout){ // Remember to 1st pass $scope as a str!
    $scope.name = "Uche";
    
    $timeout(function() {
        $scope.name = 'Everybody!';
    }, 3000);
}]);
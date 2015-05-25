var tempConv = angular.module('tempConv', []);

tempConv.controller('mainController',['$scope',function($scope) {
    $scope.tempC = 0.0;
    
    $scope.tempF = function(tempC) {
        var tempF;
        if (tempC === 0 || tempC === ) {
            tempF = 32.0;
        } else {
            tempF = (9.0 / 5.0) * parseFloat(tempC) + 32.0;
        }
        return tempF;
    };
    
    $scope.tempK = function(tempC){
        var tempK;
        if (tempC === 0 || tempC === NaN) {
            tempK = 273.0;
        } else {
            tempK = parseFloat(tempC) + 273.0;
        }
        return tempK;
    };
}]);
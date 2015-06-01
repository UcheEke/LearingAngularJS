// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// ROUTES
weatherApp.config(function ($routeProvider) {
   
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/home.htm',
        controller: 'homeController'
    })
    
    .when('/forecast', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })
    
    .when('/forecast/:days', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })
    
});

// SERVICES
weatherApp.service('cityService', function() {
    this.city = "New York, NY";   // default value    
});

// CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.$watch('city', function() {
       cityService.city = $scope.city; 
    });
    
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService) {
    
    $scope.city = cityService.city;
    $scope.lat = '';
    $scope.long = '';
    
    $scope.days = $routeParams.days || '2';
    
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
    
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });
    
    $scope.$watch(function(scope){return scope.weatherResult.$resolved === true;},function() {
        if($scope.weatherResult.city){
            console.log("Promise resolved:",$scope.weatherResult);
            $scope.lat = new Number($scope.weatherResult.city.coord.lat).toFixed(3);
            $scope.long = new Number($scope.weatherResult.city.coord.lon).toFixed(3);
        }
    }); 
    
    $scope.convertToCentigrade = function(degK) {
        // Converts from Kelvin to Centigrade
        return Math.round(degK - 273);
        
    }
    
    $scope.convertToFahrenheit = function (degK) {
        // Converts from Kelvin to Fahrenheit
        return Math.round((9.0/5.0*(degK - 273) + 32));
    }
    
    $scope.convertToDate = function(dt) { 
      
        date = new Date(dt * 1000);
        date = date.toDateString();
        date = date.split(' ');
        return date[0]+', '+date[1] + ' ' + date[2];
         
    };
    
}]);
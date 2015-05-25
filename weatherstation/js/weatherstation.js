// Define the application 'weatherApp' as an AngularJS module.
// Include the dependencies as listed in index.htm (route and resource)
var weatherApp = angular.module('weatherApp',['ngRoute', 'ngResource']);

// Add routes to the application. We will have two views to choose from
// 1. The Home view @ '/'
// 2. The Forecast view @ '/forecast'
// Each view will have a seperate controller
weatherApp.config(function($routeProvider){
    $routeProvider
    .when('/',{
            templateUrl: 'pages/home.htm',
            controller: 'homeController'
        })
    .when('/forecast',{
            templateUrl: 'pages/forecast.htm',
            controller: 'forecastController'
    });
});

// Define a custom service, srvInfo
weatherApp.service('srvCity',function(){
    this.City = '';
});

// Define the controllers
weatherApp.controller('homeController',['$scope','srvCity',
    function($scope, srvCity){
        
        $scope.City = srvCity.City;
        
        // Set up a $watch function for the 'City' variable in $scope.
        // If it changes, the digest cycle will update the values connected to it
        $scope.$watch('City',function(){
            srvCity.City = $scope.City;
        });
        
        console.log('Service City: ', srvCity.City);
        console.log('Homepage City: ', $scope.City);
    }                                    
]);
weatherApp.controller('forecastController',['$scope','srvCity',
    function($scope, srvCity){
        $scope.forecastCity= srvCity.City;
        
        // Remember to update here too....
        $scope.$watch('forecastCity',function(){
            $scope.forecastCity = srvCity.City;
        });
        console.log('Service City: ', srvCity.City);
        console.log('Forecast City: ', $scope.City);
    }
]);

        

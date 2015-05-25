// In order to use different views, we have to include the ngRoute dependency.
var cds = angular.module('cds',['ngRoute']);

// This is then employed as '$routeProvider' via the controller.config function
// Each route is described by the .when(prefix,detailObject) function which 
// can be chainged indefinitely

cds.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl: 'templates/firstview.htm',
        controller:  'firstController'
    })
    .when('/second',{
        templateUrl : 'templates/secondview.htm',
        controller  : 'secondController'
    })
});

// First controller
// This acts on the first view, when '/' is required and provides it's own copy of $scope
cds.controller('firstController',['$scope','$log',
    function($scope,$log){
        $scope.person = {
            name : 'Phillip Driscoll',
            age  : '28',
            occupation: 'Construction Worker',
            address : {
                houseNumber : '410',
                street :   'Hanson Grove',
                city :  'Basingstoke',
                postcode : 'RG12 5RE'
            }
        };
        $log.info('We are using the first controller!');
    }]);

// Second controller, called when '/second' is required, with another $scope independent of
// the first controller. $log however is a singleton, like most other AngularJS 
// built-in dependencies
cds.controller('secondController',['$scope','$log',
    function($scope,$log){
        
        $scope.people = [
            {   name : 'Linda Peterson',
                age  : '45',
                occupation: 'Systems Analyst',
                address : {
                    houseNumber : '32',
                    street :   'Roland Street',
                    city :  'Andover',
                    postcode : 'SP34 4ED'
                }
            },
            {   name : 'Christopher Ibarra',
                age  : '52',
                occupation: 'OSHA Director',
                address : {
                    houseNumber : '2',
                    street :   'Flitton Drive',
                    city :  'Whistable',
                    postcode : 'CT12 8GU'
                }
            }
        ];
        
        $scope.formattedAddress = function(person){
            return person.address.houseNumber + ' ' + 
                person.address.street + ', ' +
                person.address.city + ' ' +
                person.address.postcode;
        };
        $log.info('We are using the second controller!');
    }]);

// Custom directive 'nameData' shows up as <name-data> tags in firstview.htm
// AngularJS replaces the <name-data> tags with the template HTML at the templateUrl
// provided
cds.directive('nameData',function(){
    return {
        templateUrl : 'directives/nameData.htm',
        scope: {
            // Scope Isolation: Creates 'deny-all except' access-list 
            // to parent $scope variable
            personObject : '=' // refers to 'person-object' custom attr. in firstview.htm
        },
        replace: false
    };    
});

// Custom directive 'peopleData' works with the <people-data> tags in secondview.htm
//(NB: bumped into AngularJS known bug when replace=true --> 
// http://stackoverflow.com/questions/19233372/template-must-have-exactly-one-root-element-with-custom-directive-replace-true)
cds.directive('peopleData',function(){
    return {
        templateUrl : 'directives/peopleData.htm',
        scope : {
            personName : '@', // Read-only access to personName
            personAge : '@',
            personOcc : '@',
            personObject : '=',
            fnFormattedAddress : '&' // Function call mapping from parent scope to restricted scope
        },
        replace: false
    };    
});
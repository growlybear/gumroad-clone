'use strict';

angular.module('myApp', [
    'ngRoute',
    'myApp.services',
    'myApp.directives'
]).config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        controller: 'MainCtrl',
        templateUrl: 'templates/main.html'
    })
    .otherwise({
        redirectTo: '/'
    });
});

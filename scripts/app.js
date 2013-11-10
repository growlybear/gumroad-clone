'use strict';

// callback from G+
window.appInit = function () {
    // when the document is ready
    angular.element(document).ready(function () {
        // bootstrap the oauth2 library
        gapi.client.load('oauth2', 'v2', function () {
            // and finally, bootstrap our angular app
            angular.bootstrap(document, ['myApp']);
        });
    });
};


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

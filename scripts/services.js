angular.module('myApp.services', [])
.factory('UserService', function ($q, $http) {
    var service = {
        _user: null,

        setCurrentUser: function (u) {
            if (u && !u.error) {
                service._user = u;
                return service.currentUser();
            } else {
                var d = $q.defer();
                d.reject(u.error);
                return d.promise;
            }
        },

        currentUser: function () {
            var d = $q.defer();
            d.resolve(service._user);
            return d.promise;
        }
    };

    return service;
});

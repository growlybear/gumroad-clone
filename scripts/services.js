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

            if (service._user) {
                d.resolve(service._user);
            } else {
                gapi.client.oauth2.userinfo.get().execute(function (e) {
                    service._user = e;
                })
            }

            return d.promise;
        }
    };

    return service;
});

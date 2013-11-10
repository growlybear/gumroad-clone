angular.module('myApp.directives', [])
.directive('googleSignin', function () {
    return {
        restrict: 'A',
        template: '<span id="signinButton></span>',
        replace: true,
        scope: {
            afterSignin: '&'
        },
        link: function (scope, ele, attrs) {
            // set the standard google class
            attrs.$set('class', 'g-signin');
            // set the clientid
            attrs.$set('data-clientid', attrs.clientId + '.apps.googleusercontent.com');
            // build scope urls
            var scopes = attrs.scopes || [
                'auth/plus.login',
                'auth/userinfo.email'
            ];

            var i = 0,
                scopeUrls = [];

            for (i; i < scopes.length; i++) {
                scopeUrls.push('https://www.googleapis.com/' + scopes[i]);
            }

            // create a custom callback method
            var callbackId = '_googleSigninCallback',
                directiveScope = scope;

            window[callbackId] = function () {
                var oauth = arguments[0];
                directiveScope.afterSignin({ oauth: oauth });
                window.callbackId = null;   // cleanup
            }

            // set the standard google signin button settings
            attrs.$set('data-callback', callbackId);
            attrs.$set('data-cookiepolicy', 'single_host_origin');
            attrs.$set('data-requestvisibleactions', 'http://schemas.gogle.com/AddActivity');
            attrs.$set('data-scope', scopeUrls.join(' '));

            // finally, reload the client library to force
            // the button to be painted in the browser
            (function () {
                var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
                po.src = 'https://apis.google.com/js/client:plusone.js';
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
            }());
        }
    };
});

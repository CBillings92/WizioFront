angular.module('AuthApp')
.factory('AuthFct', [
    '$state',
    '$localStorage',
    '$http',
    '$rootScope',
    'AuthRegistrationResource',
    'AuthLoginResource',
    'TokenSvc',
    function($state, $localStorage, $http, $rootScope, AuthRegistrationResource, AuthLoginResource, TokenSvc) {
        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base 64 string!';
            }
            return window.atob(output);
        }

        return {
            signup: function(data, success, error) {
                AuthRegistrationResource.save(null, data, function(status, data) {
                    console.log(data);
                });
            },
            signin: function(data, success, error) {
                AuthLoginResource.save(data, function(data){
                    success(data);
                });
            },
            logout: function(success) {
                tokenClaims = {};
                delete $localStorage.token;
                $rootScope.isLoggedIn = false;
                success();
            },
            getTokenClaims: function() {
                var token = $localStorage.token;

                var user = {};
                if (typeof token !== 'undefined') {
                    if (token) {
                        var encoded = token.split('.')[1];
                        console.dir(encoded);
                        user = JSON.parse(urlBase64Decode(encoded));
                    }

                }
                console.dir(user);
                return user;
            }
        };
    }
]);

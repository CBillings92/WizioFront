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
        var isLoggedin = function(){
            var tokenExp = true;
            var token = TokenSvc.getToken();

            if(token !== "No Token"){
                tokenExp = TokenSvc.checkExp(token);
            }

            if(token === "No Token" || tokenExp){
                return false;
            } else {
                return true;
            }
        };

        return {
            signup: function(data, success, error) {
                AuthRegistrationResource.save(null, data, function(data, status) {
                    success(status);
                });
            },
            signin: function(data, success, error) {
                AuthLoginResource.save(data, function(data, status){
                    success(data, status);
                });
            },
            logout: function() {
                delete $localStorage.token;
                $rootScope.isLoggedIn = false;
                $state.go('LandingPage');
            },
            isLoggedin: isLoggedin
        };
    }
]);

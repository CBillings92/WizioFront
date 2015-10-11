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
            var token = TokenSvc.getToken();
            var tokenExp = TokenSvc.checkExp(token);
            console.dir(token);
            if(token && !tokenExp){
                console.dir(token);
                console.dir(!tokenExp);
                return true;
            } else {
                return false;
            }
        };

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
                $state.go('LandingPage');
            },
            isLoggedin: isLoggedin
        };
    }
]);

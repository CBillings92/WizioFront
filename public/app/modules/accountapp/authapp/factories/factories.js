angular.module('AuthApp')
.factory('AuthFct', [
    '$state',
    '$localStorage',
    '$rootScope',
    'AuthRegistrationResource',
    'AuthLoginResource',
    'TokenSvc',
    function($state, $localStorage, $rootScope, AuthRegistrationResource, AuthLoginResource, TokenSvc) {
        //check if a user is logged in
        var isLoggedin = function(){
            var tokenExp = true;
            var token = TokenSvc.getToken();
            if(token === "No Token" || tokenSvc.checkExp(token)){
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
            signin: function(data, callback) {
                AuthLoginResource.save(data, function(data){
                    if(!data.token){
                        $rootScope.error = "Failed to sign in!";
                        return callback("failed");
                    } else {
                        $rootScope.isLoggedIn = true;
                        $rootScope.userType = TokenSvc.decode().userType;
                        return callback(data, status);
                    }
                });
            },
            logout: function() {
                $localStorage.token = null;
                delete $localStorage.token;
                $rootScope.isLoggedIn = false;
                if($state.current.data.requireLogin){
                    $state.go('LandingPage');
                    return;
                }
                return;
            },
            isLoggedin: isLoggedin
        };
    }
]);

angular.module('AuthApp')
.factory('AuthFct', [
    '$state',
    '$localStorage',
    '$rootScope',
    '$q',
    'AuthRegistrationResource',
    'AuthLoginResource',
    'TokenSvc',
    function($state, $localStorage, $rootScope, $q, AuthRegistrationResource, AuthLoginResource, TokenSvc) {
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
        /*  SIGNIN()
            signin - used to sign users into our site.
            expects {username: username, password: password}
            uses $q and $promise to handle async with promises
        */
        function signin(data) {
            return $q(function(resolve, reject) {
                var postRequest = AuthLoginResource.save(data);
                postRequest.$promise
                .then(function(result) {
                    $rootScope.isLoggedin = true;
                    $rootScope.userType = TokenSvc.decode().userType;
                    resolve('success');
                })
                .catch(function(result) {
                    $rootScope.error = "Failed to sign in!";
                    reject('failed');
                });
            });
        }

        function signup(data) {
            return $q(function(resolve, reject) {
                var registrationRequest = AuthRegistrationResource.save(null, data);
                registrationRequest.$promise
                .then(function(result) {
                    resolve(result);
                })
                .catch(function(result) {
                    reject(result);
                });
            });
        }

        return {
            signup: signup,
            signin: signin,
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

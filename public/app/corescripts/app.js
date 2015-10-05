angular.module('UnitApp', []);
angular.module('AccountApp', []);
angular.module('ApplicationApp', []);
angular.module('AuthApp', []);
angular.module('BlogApp', []);
angular.module('LandingPageApp', []);
angular.module('NavbarApp', []);
angular.module('SharedControllersApp', []);
angular.module('SharedFactoryApp', []);
angular.module('SharedServiceApp', []);
angular.module('SellerApp', []);


angular.module('MainApp', [
        //change to UnitApp

        'ApplicationApp',
        'AccountApp',
        'AuthApp',
        'LandingPageApp',
        'BlogApp',
        'NavbarApp',
        'SharedControllersApp',
        'SharedFactoryApp',
        'SharedServiceApp',
        'SellerApp',
        'UnitApp',
        'ui.router',
        'ngStorage',
        'ngResource',
        'ngLodash',
        'ui.bootstrap',
        'angular-jwt'
    ])
    .run([
        '$rootScope',
        '$state',
        '$http',
        '$localStorage',
        'jwtHelper',
        'AuthFct',
        'TokenSvc',
        function($rootScope, $state, $http, $localStorage, jwtHelper, AuthFct, TokenSvc) {
            //on angular app instantiaion check if a localStorage token exists and
            //if it's expired. Assign isLoggedIn to $rootScope accordingly
            var tokenIsExp = TokenSvc.checkExp();
            var token = TokenSvc.getToken();

            if (!token) {
                $rootScope.isLoggedIn = false;
            } else if (tokenIsExp){
                $rootScope.isLoggedIn = false;
                TokenSvc.deleteToken();
            } else {
                $rootScope.userType = AuthFct.getTokenClaims().userType;
                console.dir($rootScope.userType);
                $rootScope.isLoggedIn = true;
            }

            //Watch for angular app state changes
            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                //check if the state being navigated to requires login
                token = TokenSvc.getToken();
                tokenIsExp = TokenSvc.checkExp();
                if (toState && toState.data.requireLogin === true) {
                    requireLogin = true;
                } else {
                    requireLogin = false;
                }
                //check if token is expired
                if(tokenIsExp){
                    TokenSvc.deleteToken();
                }
                //if state requires login, if token exists, if its expired, login
                console.dir(token);
                if (requireLogin === true && token && tokenIsExp) {
                    event.preventDefault();
                    alert('Session is expired. Please login again');
                    $rootScope.isLoggedIn = false;
                    return $state.go('Login');
                } else if (requireLogin === true && !token) {
                    alert('Please login');
                    event.preventDefault();
                    $rootScope.isLoggedIn = false;
                    return $state.go('Login');
                } else if (!token || tokenIsExp) {
                    $rootScope.isLoggedIn = false;
                } else {
                    $rootScope.isLoggedIn = true;
                }
                return;
            });
        }
    ]);

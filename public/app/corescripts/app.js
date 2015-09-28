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
            if (!TokenSvc.getToken()) {
                $rootScope.isLoggedIn = false;
            } else if (tokenSvc.checkExp){
                $rootScope.isLoggedIn = false;
                TokenSvc.deleteToken;
            } else {
                $rootScope.userType = AuthFct.getTokenClaims().userType;
                console.dir($rootScope.userType);
                $rootScope.isLoggedIn = true;
            }
            //Watch for angular app state changes
            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                //check if the state being navigated to requires login
                if (toState && toState.data.requireLogin !== undefined) {
                    requireLogin = true;
                }
                //if token has no data in it or is null, delete
                if (token.data === null){
                    TokenSvc.deleteToken();
                }
                //check if token is expired
                if(TokenSvc.checkExp){
                    TokenSvc.deleteToken();
                }
                //if state requires login, if token exists, if its expired, login
                if (requireLogin === true && TokenSvc.getToken() && TokenSvc.checkExp()) {
                    event.preventDefault();
                    alert('Token is expired. Please login again');
                    $rootScope.isLoggedIn = false;
                    return $state.go('Login');
                } else if (requireLogin === true && !TokenSvc.getToken()) {
                    alert('Please login');
                    event.preventDefault();
                    $rootScope.isLoggedIn = false;
                    return $state.go('Login');
                } else if (!TokenSvc.getToken() || TokenSvc.CheckExp()) {
                    $rootScope.isLoggedIn = false;
                } else {
                    $rootScope.isLoggedIn = true;
                }
                return;
            });
        }
    ]);

angular.module('UnitApp', []);
angular.module('BuyerApp', []);
angular.module('AccountCreateApp', []);
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
        function($rootScope, $state, $http, $localStorage, jwtHelper) {
            //on angular app instantiaion check if a localStorage token exists and
            //if it's expired. Assign isLoggedIn to $rootScope accordingly
            if (!$localStorage.token) {
                $rootScope.isLoggedIn = false;
            } else if (jwtHelper.isTokenExpired($localStorage.token)){
                $rootScope.isLoggedIn = false;
                delete $localStorage.token;
            } else {
                $rootScope.isLoggedIn = true;
            }
            //Watch for angular app state changes
            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                var requireLogin = false;
                var token = $localStorage.tokens;
                var isTokenExpired = jwtHelper.isTokenExpired(token);

                //check if the state being navigated to requires login
                if (toState && toState.data.requireLogin !== undefined) {
                    requireLogin = true;
                }
                if (token.data === null){
                    delete $localStorage.token;
                }
                if(isTokenExpired){
                    delete $localStorage.token;
                }
                //if state requires login, if token exists, if its expired, login
                if (requireLogin === true && token && isTokenExpired) {
                    event.preventDefault();
                    alert('Token is expired. Please login again');
                    $rootScope.isLoggedIn = false;
                    return $state.go('Login');
                } else if (requireLogin === true && !token) {
                    alert('Please login');
                    event.preventDefault();
                    $rootScope.isLoggedIn = false;
                    return $state.go('Login');
                } else if (!token || isTokenExpired) {
                    $rootScope.isLoggedIn = false;
                } else {
                    $rootScope.isLoggedIn = true;
                }
                return;
            });
        }
    ]);

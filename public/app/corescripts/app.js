angular.module('AccountCreateApp', []);
angular.module('ApartmentDetailsApp', []);
angular.module('BlogApp', []);
angular.module('LandingPageApp', []);
angular.module('LoginApp', []);
angular.module('BrokerApp', []);
angular.module('NavbarApp', []);
angular.module('ApartmentsApp', []);
angular.module('SharedFactoriesApp', []);
angular.module('SharedServicesApp', []);


angular.module('MainApp', [
        'ApartmentsApp',
        'ApartmentDetailsApp',
        'LandingPageApp',
        'AccountCreateApp',
        'BlogApp',
        'NavbarApp',
        'LoginApp',
        'BrokerApp',
        'SharedFactoriesApp',
        'SharedServicesApp',
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
            if (!$localStorage.token || jwtHelper.isTokenExpired($localStorage.token)) {
                $rootScope.isLoggedIn = false;
            } else {
                $rootScope.isLoggedIn = true;
            }
            //Watch for angular app state changes
            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                var requireLogin = null;
                //check if the state being navigated to requires login
                if (toState && toState.data.requireLogin) {
                    requireLogin = toState.data.requireLogin;
                }
                //if state requires login, if token exists, if its expired, login
                if (requireLogin === true && $localStorage.token && jwtHelper.isTokenExpired($localStorage.token)) {
                    event.preventDefault();
                    alert('Token is expired. Please login again');
                    $rootScope.isLoggedIn = false;
                    return $state.go('Login');
                } else if (requireLogin === true && !$localStorage.token) {
                    alert('Please login');
                    event.preventDefault();
                    $rootScope.isLoggedIn = false;
                    return $state.go('Login');
                } else if (!$localStorage.token || jwtHelper.isTokenExpired($localStorage.token)) {
                  alert('kdfjslkjfslkdfjsfdj');
                    $rootScope.isLoggedIn = false;
                } else {
                    $rootScope.isLoggedIn = true;
                }
                return;
            });
        }
    ]);

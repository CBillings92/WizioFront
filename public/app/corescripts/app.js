(function() {
    //CREATE ALL TOP LEVEL APPS (create, not start)
    angular.module('AboutUsApp', []);
    angular.module('ApiGuideApp', []);
    angular.module('AdminPanelApp', []);
    angular.module('CreateAccountApp', []);
    angular.module('DashboardApp', []);
    angular.module('DeleteTourApp', []);
    angular.module('LoginApp', []);
    angular.module('TourApp', []);
    angular.module('VrPlayerInterfaceApp', []);
    angular.module('AccountApp', []);
    angular.module('AmazonS3UploadApp', []);
    angular.module('ApplicationApp', []);
    angular.module('AuthApp', []);
    angular.module('VrPlayerApp', []);
    angular.module('FooterApp', []);
    angular.module('InfoApp', []);
    angular.module('LandingPageApp', []);
    angular.module('LeaseApp', []);
    angular.module('NavbarApp', []);
    angular.module('SharedFactoryApp', []);
    angular.module('SharedServiceApp', []);
    angular.module('UnitApp', []);
    angular.module('FooterApp', []);
    angular.module('Models', []);
    angular.module('Directives', []);
    angular.module('UploadPageApp', []);
    angular.module('PhotographerApp', []);
    angular.module('SearchApp', []);
    angular.module('AWSApp', []);
    angular.module('AgentProfileApp', []);
    angular.module('TourPasswordApp', []);
    angular.module('TourApp', []);
    angular.module('ShareTourApp', []);
    angular.module('TourPanelApp', []);
    angular.module('FlyOutMenuApp', []);
    angular.module('ProductInfoApp', []);

    //LOAD 'MainApp' ANGULAR module
    //LOAD ALL TOP LEVEL APPLICATIONS INTO MAIN APP
    angular.module('MainApp', [
            'AdminPanelApp',
            'ApiGuideApp',
            'AccountApp',
            'ApplicationApp',
            'TourApp',
            'VrPlayerInterfaceApp',
            'AuthApp',
            'CreateAccountApp',
            'DashboardApp',
            'DeleteTourApp',
            'LoginApp',
            'VrPlayerApp',
            'AboutUsApp',
            'TourApp',
            'Directives',
            'FooterApp',
            'InfoApp',
            'LandingPageApp',
            'UploadPageApp',
            'LeaseApp',
            'NavbarApp',
            'SharedFactoryApp',
            'SharedServiceApp',
            'PhotographerApp',
            'SearchApp',
            'TourPasswordApp',
            'TourPanelApp',
            'ShareTourApp',
            'AWSApp',
            'AgentProfileApp',
            'UnitApp',
            'FlyOutMenuApp',
            'ProductInfoApp',
            'Models',
            'ui.router',
            'ngStorage',
            'ngResource',
            'ngLodash',
            'ui.bootstrap',
            'angular-jwt',
            'angulartics',
            'angulartics.google.analytics',
            'angular-sortable-view',
            'ng-drift'
        ])
        .config(["$sceDelegateProvider", "ngDriftProvider", function($sceDelegateProvider, ngDriftProvider) {
            $sceDelegateProvider.resourceUrlWhitelist([
                // Allow same origin resource loads.
                'self',
                // Allow loading from our assets domain.  Notice the difference between * and **.
                'cdn.wizio.co/**',
                'https://cdn.wizio.co/**',
                'https://cdn.wizio.co/**',
                'https://youtu.be/**',
                'https://www.youtube.com/watch?v=**',
                'https://www.youtube.com/watch?v=*&feature=youtu.be',
                'http://www.youtube.com/embed/**'
            ]);
            ngDriftProvider.setKey('xxagivsgiw52');
            // ngDriftProvider.setKey('xxagivsgiw52');

        }])
        //ON APP START AND DURING APP RUN
        .run([
            '$rootScope',
            '$state',
            '$stateParams',
            '$localStorage',
            '$window',
            'jwtHelper',
            'AuthFct',
            'TokenSvc',
            'LoadingSpinnerFct',
            '$transitions',
            '$location',
            '$anchorScroll',
            function($rootScope, $state, $stateParams, $localStorage, $window, jwtHelper, AuthFct, TokenSvc, LoadingSpinnerFct, $transitions, $location, $anchorScroll) {


                $rootScope.state = $state;
                $rootScope.stateParams = $stateParams;

                $transitions.onSuccess({}, function() {
                  $anchorScroll();

                });

                var token = TokenSvc.getToken();
                var tokenIsExp = null;
                if (token) {
                    tokenIsExp = TokenSvc.checkExp();
                }

                //if no token exists, assign isLoggedIn to false
                //if token is expired, assign isLoggedIn to false
                //else, assign isLoggedInto to true
                if (token === 'No Token') {
                    //if no token, check if user is logged into facebook
                } else if (tokenIsExp) {
                    TokenSvc.deleteToken();
                } else {
                    $rootScope.userType = TokenSvc.decode().userType;
                    $rootScope.isLoggedIn = true;
                }
            }
        ]);
}());

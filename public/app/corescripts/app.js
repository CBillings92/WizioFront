(function() {
    //CREATE ALL TOP LEVEL APPS (create, not start)
    angular.module('AboutUsApp', []);
    angular.module('AdminPanelApp', []);
    angular.module('AccountApp', []);
    angular.module('AmazonS3UploadApp', []);
    angular.module('ApplicationApp', []);
    angular.module('AuthApp', []);
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
    //LOAD 'MainApp' ANGULAR module
    //LOAD ALL TOP LEVEL APPLICATIONS INTO MAIN APP
    angular.module('MainApp', [
            'AdminPanelApp',
            'AccountApp',
            'ApplicationApp',
            'AuthApp',
            'AboutUsApp',
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
            'UnitApp',
            'Models',
            'ui.router',
            'ngStorage',
            'ngResource',
            'ngLodash',
            'ui.bootstrap',
            'angular-jwt',
            'angularMoment',
            'angulartics',
            'angulartics.google.analytics',
        ])
        .config(["$sceDelegateProvider", function($sceDelegateProvider) {
            $sceDelegateProvider.resourceUrlWhitelist([
                // Allow same origin resource loads.
                'self',
                // Allow loading from our assets domain.  Notice the difference between * and **.
                'cdn.wizio.co/**',
                'http://cdn.wizio.co/**',
                'https://youtu.be/**',
                'https://www.youtube.com/watch?v=**',
                'https://www.youtube.com/watch?v=*&feature=youtu.be',
                'http://www.youtube.com/embed/**'
            ]);
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
            function($rootScope, $state, $stateParams, $localStorage, $window, jwtHelper, AuthFct, TokenSvc) {

                $rootScope.state = $state;
                $rootScope.stateParams = $stateParams;

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
                    console.dir(1);
                    $rootScope.userType = TokenSvc.decode().userType;
                    $rootScope.isLoggedIn = true;
                }
            }
        ]);
}());

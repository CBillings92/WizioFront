angular.module('MainApp')
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        '$locationProvider',
        '$httpProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
            console.dir("test2");
            $stateProvider
                .state('LandingPage', {
                    url: '/',
                    views: {
                        "maincontent": {
                            templateUrl: 'public/viewtemplates/public/landingpage.html',
                            controller: 'landingpagectrl'
                        }
                    }
                })
                .state('AccountCreate', {
                    url: '/createaccount',
                    views: {
                        "maincontent": {
                            templateUrl: 'public/viewtemplates/public/accountcreate.html',
                            controller: 'AccountCreateCtrl'
                        }
                    }
                });
                $urlRouterProvider.otherwise('/');
        }
    ]);

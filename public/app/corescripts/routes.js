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
                .state('Blog', {
                  url: '/blog',
                  views: {
                    "maincontent": {
                      templateUrl: 'public/viewtemplates/public/blog.html',
                      controller: 'blogctrl'
                    }
                  }
                })
                .state('UserCreate', {
                  url: '/createacct',
                  views: {
                    "maincontent": {
                      templateUrl: 'public/viewtemplates/public/accountcreateform.html',
                      controller: 'UserCreateCtrl'
                    }
                  }
                });
                $urlRouterProvider.otherwise('/');
        }
    ]);

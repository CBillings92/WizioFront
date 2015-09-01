angular.module('MainApp')
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        '$locationProvider',
        '$httpProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
            var navbar = {
                templateUrl: 'public/viewtemplates/public/navbar.html',
                controller: 'NavbarCtrl'
            };
            var requireLogin = {
                requireLogin: true
            };
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
                .state('ApartmentDetails', {
                  url:'/apartmentdetails',
                  views: {
                    "navbar": navbar,
                    "maincontent": {
                      templateUrl: 'public/viewtemplates/public/apartmentdetailspage.html',
                      controller: 'ApartmentDetailsCtrl'
                    }
                  }
                })
                .state('ApartmentsDisplay', {
                    url: '/apartments',
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: 'public/viewtemplates/public/apartmentsdisplay.html',
                            controller: 'ApartmentsDisplayCtrl'
                        }
                    }
                })
                .state('Blog', {
                    url: '/blog',
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: 'public/viewtemplates/public/blog.html',
                            controller: 'blogctrl'
                        }
                    }
                })
                .state('AccountCreate', {
                    url: '/createaccount',
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: 'public/viewtemplates/public/accountcreate.html',
                            controller: 'AccountCreateCtrl'
                        }
                    }
                })
                .state('Login', {
                    url: '/login',
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: 'public/viewtemplates/public/login.html',
                            controller: 'LoginCtrl'
                        }
                    }
                })
                .state('CreateApartment', {
                    url: '/createapartment',
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: 'public/viewtemplates/public/createapartment.html',
                            controller: 'CreateApartmentCtrl'
                        }
                    }
                })
                .state('UserAccount', {
                    url: '/account',
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: 'public/viewtemplates/public/account.html',
                            controller: 'AccountCtrl'
                        }
                    },
                    data: requireLogin
                })

            .state('BrokerAdditionalInfo', {
                url: '/brokerInfo',
                views: {
                    "navbar": navbar,
                    "maincontent": {
                        templateUrl: 'public/viewtemplates/public/brokeraddinfo.html',
                        controller: 'BrokerAddInfoCtrl'
                    }
                }
            });
            $urlRouterProvider.otherwise('/');

            $httpProvider.interceptors.push([
                '$q',
                '$location',
                '$localStorage',
                '$injector',
                function($q, $location, $localStorage, $injector) {
                    return {
                        request: function(config) {
                            config.headers = config.headers || {};
                            console.dir(config.headers);
                            if (config.headers.searchCheck) {
                                delete config.headers.searchCheck;
                                return config;
                            } else {
                                if ($localStorage.token) {
                                    config.headers.Authorization = $localStorage.token;
                                }
                                return config;
                            }

                        },
                        responseError: function(response) {
                            if (response.status === 401 || response.status === 403) {
                                //$cookie.remove('token', []);
                                alert('Authentication Failed');
                            }
                            $injector.get('$state').transitionTo('Login');
                            return $q.reject(response);
                        }

                    };
                }

            ]);
        }
    ]);

angular.module('MainApp')
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        '$locationProvider',
        '$httpProvider',
        'WizioConfig',
        function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, WizioConfig) {
            var navbar = {
                templateUrl: WizioConfig.NavbarViewsURL + 'Navbar.html',
                controller: 'NavbarCtrl'
            };
            var trueRequiredLogin = {
                requireLogin: true
            };
            var falseRequiredLogin = {
                requireLogin: false
            };
            $stateProvider
                .state('LandingPage', {
                    url: '/',
                    views: {
                        "maincontent": {
                            templateUrl: 'public/viewtemplates/public/landingPage.html',
                            controller: 'LandingPageCtrl'
                        }
                    },
                    data: falseRequiredLogin
                })
                .state('UnitDetails', {
                    url: '/UnitDetails/:id',
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: WizioConfig.UnitViewsURL + 'aptDetailsPage.html',
                            controller: 'UnitDetailCtrl'
                        }
                    },
                    data: falseRequiredLogin
                })
                .state('AptDisplay', {
                    url: '/aptDisplay',
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: WizioConfig.UnitViewsURL + 'aptDisplay.html',
                            controller: 'UnitDisplayCtrl'
                        }
                    },
                    data: falseRequiredLogin
                })
                .state('Blog', {
                    url: '/blog',
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: 'public/viewtemplates/public/blog.html',
                            controller: 'BlogCtrl'
                        }
                    },
                    data: falseRequiredLogin
                })
                //auth-ify this
                .state('AccountCreate', {
                    url: '/accountCreate',
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: WizioConfig.AuthViewsURL + '/accountCreate.html',
                            controller: 'AccountCreateCtrl'
                        }
                    },
                    data: falseRequiredLogin
                })
                .state('Login', {
                    url: '/login',
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: WizioConfig.AuthViewsURL + 'Login.html',
                            controller: 'AuthLoginCtrl'
                        }
                    },
                    data: falseRequiredLogin
                })
                .state('SendResetEmail', {
                    url: '/sendresetpassemail',
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: WizioConfig.AuthViewsURL + 'sendresetpassemail.html',
                            controller: 'AuthLoginCtrl'
                        }
                    },
                    data: falseRequiredLogin
                })
                .state('UpdatePassword', {
                    url: '/resetpassword/:token',
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: WizioConfig.AuthViewsURL + 'resetpassword.html',
                            controller: 'AuthLoginCtrl'
                        }
                    },
                    data: falseRequiredLogin
                })
                .state('createApt', {
                    url: '/createApt',
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: WizioConfig.UnitViewsURL + 'UnitCreateCtrl.html',
                            controller: 'UnitCreateCtrl'
                        }
                    },
                    data: trueRequiredLogin
                })
                .state('BuyerAccount', {
                    url: '/b/account',
                    abstract: true,
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: 'public/viewtemplates/private/buyer/accountMain.html',
                            controller: 'dashBuyerMainCtrl'
                        }
                    },
                    data: trueRequiredLogin
                })
                .state('BuyerAccount.Dashboard',{
                    url: '/dashboard',
                    templateUrl: 'public/viewtemplates/public/account/accountmain.html',
                    controller: 'AccountCtrl',
                    views: {
                        accountInfo: {
                            templateUrl: 'public/viewtemplates/private/buyer/accountInfo.html',
                            controller: "dashBuyerInfoCtrl"
                        },
                        appliedApartments: {
                            templateUrl: 'public/viewtemplates/public/account/appliedApts.html',
                            controller: "dashAppliedCtrl"
                        }
                    },
                    data: trueRequiredLogin
                })
            .state('sellerDashboard', {
                    url: '/brokerInfo',
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: 'public/viewtemplates/public/brokerAddInfo.html',
                            controller: 'brokerAddInfoCtrl'
                        }
                    },
                    data: trueRequiredLogin
                })
                .state('Profile', {
                    url: '/profile',
                    abstract: true,
                    views:{
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: 'public/app/modules/buyerapp/profileapp/viewtemplates/profilemain.html'
                        }
                    },
                    data: trueRequiredLogin
                })
                .state('Profile.Create', {
                    url: '/create',
                    views: {
                        "profilepage": {
                            templateUrl: 'public/app/modules/buyerapp/profileapp/viewtemplates/profileform.html',
                            controller: 'ProfileFormCtrl'
                        }
                    },
                    data: trueRequiredLogin
                })
                .state('Profile.Edit', {
                    url: '/edit',
                    views: {
                        "profilepage": {
                            templateUrl: 'public/app/modules/buyerapp/profileapp/viewtemplates/profileform.html',
                            controller: 'ProfileFormCtrl'
                        }
                    },
                    data: trueRequiredLogin
                })
                .state('Application', {
                    url: '/application',
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: "public/app/modules/applicationapp/applicationmain.html"
                        }
                    },
                    abstract: true,
                    data: trueRequiredLogin
                })
                .state('Application.New', {
                    url: '/new',
                    views: {
                        'ApplicationPage':{
                            templateUrl: 'public/app/modules/applicationapp/applicationformapp/viewtemplates/applicationform.html',
                            controller: 'ApplicationFormCtrl'
                        }
                    }
                })
                .state('Application.Edit', {
                    url: '/edit',
                    views: {
                        'ApplicationPage': {
                            templateUrl: 'public/app/modules/applicationapp/applicationformapp/viewtemplates/applicationform.html',
                            controller: 'ApplicationFormCtrl'
                        }
                    }
                })
                .state('Apartment', {
                    url: '/apartment',
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: 'public/app/modules/UnitApp/viewtemplates/UnitMain.html'
                        }
                    },
                    abstract: true
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
                                delete $localStorage.token;
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

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
                            templateUrl: WizioConfig.AccountAuthViewsURL + '/accountCreate.html',
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
                            templateUrl: WizioConfig.AccountAuthViewsURL + 'Login.html',
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
                            templateUrl: WizioConfig.AccountAuthViewsURL + 'sendresetpassemail.html',
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
                            templateUrl: WizioConfig.AccountAuthViewsURL + 'resetpassword.html',
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
                .state('Account', {
                    url: '/account',
                    abstract: true,
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: WizioConfig.AccountViewsURL + 'AccountMain.html',
                            controller: 'AccountMainCtrl'
                        }
                    },
                    data: trueRequiredLogin
                })
                .state('Account.Dashboard',{
                    //url: '/dashboard',
                    abstract:true,
                    views: {
                        "AccountMain": {
                            templateUrl: WizioConfig.AccountDashboardViewsURL + 'DashboardMain.html',
                            controller: 'DashboardMainCtrl',
                        }
                    }
                })
                .state('Account.Dashboard.Main', {
                    url: '/dashboard',
                    views: {
                        topHorizontal: {
                            templateUrl: WizioConfig.AccountDashboardViewsURL + 'DashboardUserInfo.html',
                            controllerProvider: function($rootScope){
                                if($rootScope.userType == 1){
                                    return 'DashboardUserInfoCtrl';
                                } else {
                                    alert("in else");
                                    return 'FakeCtrl';
                                }
                            }

                        },
                        /*leftSplit: {
                            templateUrl: 'public/viewtemplates/public/account/appliedApts.html',
                            controller: "dashAppliedCtrl"
                        },
                        rightSplit: {
                            templateUrl: '',
                            controller: ''
                        }*/
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
                            templateUrl: 'public/app/modules/AccountApp/profileapp/viewtemplates/profilemain.html'
                        }
                    },
                    data: trueRequiredLogin
                })
                .state('Profile.Create', {
                    url: '/create',
                    views: {
                        "profilepage": {
                            templateUrl: 'public/app/modules/AccountApp/profileapp/viewtemplates/profileform.html',
                            controller: 'ProfileFormCtrl'
                        }
                    },
                    data: trueRequiredLogin
                })
                .state('Profile.Edit', {
                    url: '/edit',
                    views: {
                        "profilepage": {
                            templateUrl: 'public/app/modules/AccountApp/profileapp/viewtemplates/profileform.html',
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
                .state('Unit', {
                    url: '/unit',
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: WizioConfig.UnitViewsURL + 'UnitMain.html'
                        }
                    },
                    abstract: true
                })
                .state('Unit.Create', {
                    url: '/create',
                    views: {
                        'navbar': navbar,
                        'UnitMain': {
                            templateUrl: WizioConfig.UnitViewsURL + 'UnitCreate.html',
                            controller: 'UnitCreateCtrl'
                        }
                    }
                })
                .state('Unit.Details', {
                    url: '/details/:id',
                    views: {
                        "navbar": navbar,
                        "UnitMain": {
                            templateUrl: WizioConfig.UnitViewsURL + 'aptDetailsPage.html',
                            controller: 'UnitDetailCtrl'
                        }
                    },
                    data: falseRequiredLogin
                });
            $urlRouterProvider.otherwise('/');

            $httpProvider.interceptors.push([
                '$q',
                '$location',
                '$localStorage',
                '$injector',
                'TokenSvc',
                function($q, $location, $localStorage, $injector, TokenSvc) {
                    return {
                        request: function(config) {
                            config.headers = config.headers || {};
                            if (config.headers.searchCheck) {
                                delete config.headers.searchCheck;
                                return config;
                            } else {
                                if (TokenSvc.getToken()) {
                                    config.headers.Authorization = TokenSvc.getToken();
                                }
                                return config;
                            }

                        },
                        response: function(response){
                            if(response.data.token){
                                console.dir(response.data.token);

                                TokenSvc.storeToken(response.data.token);
                                return response;
                            } else {
                                return response;
                            }
                        },
                        responseError: function(response) {
                            if (response.status === 401 || response.status === 403) {
                                TokenSvc.deleteToken();
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

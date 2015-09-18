angular.module('MainApp')
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        '$locationProvider',
        '$httpProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
            var navbar = {
                templateUrl: 'public/viewtemplates/public/navbar.html',
                controller: 'navbarCtrl'
            };
            var requireLogin = {
                requireLogin: true
            };
            $stateProvider
                .state('landingPage', {
                    url: '/',
                    views: {
                        "maincontent": {
                            templateUrl: 'public/viewtemplates/public/landingPage.html',
                            controller: 'landingPageCtrl'
                        }
                    }
                })
                .state('aptDetails', {
                    url: '/aptDetails/:id',
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: 'public/viewtemplates/public/aptDetails.html',
                            controller: 'aptDetailsCtrl'
                        }
                    }
                })
                .state('aptDisplay', {
                    url: '/aptDisplay',
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: 'public/viewtemplates/public/aptDisplay.html',
                            controller: 'aptDisplayCtrl'
                        }
                    }
                })
                .state('blog', {
                    url: '/blog',
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: 'public/viewtemplates/public/blog.html',
                            controller: 'blogCtrl'
                        }
                    }
                })
                .state('accountCreate', {
                    url: '/accountCreate',
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: 'public/viewtemplates/public/accountCreate.html',
                            controller: 'accountCreateCtrl'
                        }
                    }
                })
                .state('login', {
                    url: '/login',
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: 'public/viewtemplates/public/login.html',
                            controller: 'loginCtrl'
                        }
                    }
                })
                .state('sendResetEmail', {
                  url: '/sendResetEmail',
                  views: {
                    "navbar": navbar,
                    "maincontent": {
                      templateUrl: 'public/viewtemplates/public/sendResetEmail.html',
                      controller: 'loginCtrl'
                    }
                  }
                })
                .state('updatePassword',{
                  url: '/resetPassword/:token',
                  views: {
                    "navbar": navbar,
                    "maincontent": {
                      templateUrl: 'public/viewtemplates/public/resetPassword.html',
                      controller: 'loginCtrl'
                    }
                  }
                })
                .state('createApt', {
                    url: '/createApt',
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: 'public/viewtemplates/public/createApt.html',
                            controller: 'createApartmentCtrl'
                        }
                    }
                })
                .state('buyerAccount', {
                    url: '/buyerAccount',
                    abstract: true,
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: 'public/viewtemplates/private/buyer/accountMain.html',
                            controller: 'dashBuyerMainCtrl'
                        }
                    },
                    data: requireLogin
                })
                .state('buyerAccount.dashboard',{
                    url: '/dashboard',
                    views: {
                        accountInfo: {
                            templateUrl: 'public/viewtemplates/private/buyer/accountInfo.html',
                            controller: "dashBuyerInfoCtrl"
                        },
                        appliedApartments: {
                            templateUrl: 'public/viewtemplates/public/account/appliedApts.html',
                            controller: "dashAppliedCtrl"
                        }
                    }
                })
            .state('sellerDashboard', {
                    url: '/brokerInfo',
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: 'public/viewtemplates/public/brokerAddInfo.html',
                            controller: 'brokerAddInfoCtrl'
                        }
                    }
                })
            .state('createProfile', {
                url: '/createProfile',
                views: {
                    "navbar": navbar,
                    "maincontent": {
                        templateUrl: 'public/app/modules/buyerapp/profileapp/viewtemplates/profileForm.html',
                        controller: 'profileFormCtrl'
                    }
                }
            })
                .state('profile.create', {
                    url: '/create',
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: 'public/app/modules/buyerapp/profileapp/viewtemplates/profileForm.html',
                            controller: 'profileFormCtrl'
                        }
                    }
                })
                .state('profile.edit', {
                    url: '/edit',
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: 'public/app/modules/buyerapp/profileapp/viewtemplates/profileForm.html',
                            controller: 'profileEditCtrl'
                        }
                    }
                })
                .state('apartment', {
                    url: '/apartment',
                    abstract: true
                })
                .state('apartment.application', {
                    url:'/application',
                    abstract: true,
                    data: {
                        requireLogin: true
                    }
                })
                .state('apartment.application.new', {
                    url: '/new',
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: 'public/app/modules/applicationapp/applicationformapp/viewtemplates/applicationForm.html',
                            controller: 'applicationFormNewCtrl'
                        }
                    }
                }); //Is this semicolon supposed to be here???? from Chris Canal
                // Yes from Mallory Loomis ;)
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

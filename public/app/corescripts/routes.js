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
                    url: '/apartmentdetails/:id',
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
                .state('SendResetEmail', {
                  url: '/sendresetpassemail',
                  views: {
                    "navbar": navbar,
                    "maincontent": {
                      templateUrl: 'public/viewtemplates/public/sendresetpassemail.html',
                      controller: 'LoginCtrl'
                    }
                  }
                })
                .state('UpdatePassword',{
                  url: '/resetpassword/:token',
                  views: {
                    "navbar": navbar,
                    "maincontent": {
                      templateUrl: 'public/viewtemplates/public/resetpassword.html',
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
                    abstract: true,
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: 'public/viewtemplates/public/account/accountmain.html',
                            controller: 'AccountCtrl'
                        }
                    },
                    data: requireLogin
                })
                .state('UserAccount.Dashboard',{
                    url: '/dashboard',
                    views: {
                        accountInfo: {
                            templateUrl: 'public/viewtemplates/public/account/accountInfo.html',
                            controller: "AccountInfoCtrl"
                        },
                        appliedApartments: {
                            templateUrl: 'public/viewtemplates/public/account/appliedApartments.html',
                            controller: "appliedApartmentsCtrl"
                        },
                        suggestedApartments: {
                            templateUrl: 'public/viewtemplates/public/account/suggestedApartments.html',
                            controller: "SuggestedApartmentsCtrl"
                        }
                    }
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
                })
            .state('CreateProfile', {
                url: '/createprofile',
                views: {
                    "navbar": navbar,
                    "maincontent": {
                        templateUrl: 'public/app/modules/buyerapp/profileapp/viewtemplates/profileform.html',
                        controller: 'ProfileFormCtrl'
                    }
                }
            })
                .state('Profile.Create', {
                    url: '/create',
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: 'public/app/modules/buyerapp/profileapp/viewtemplates/profileform.html',
                            controller: 'ProfileFormCtrl'
                        }
                    }
                })
                .state('Profile.Edit', {
                    url: '/edit',
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: 'public/app/modules/buyerapp/profileapp/viewtemplates/profileform.html',
                            controller: 'ProfileEditCtrl'
                        }
                    }
                })
                .state('Apartment', {
                    url: '/apartment',
                    abstract: true
                })
                .state('Apartment.Application', {
                    url:'/application',
                    abstract: true,
                    data: {
                        requireLogin: true
                    }
                })
                .state('Apartment.Application.New', {
                    url: '/new',
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: 'public/app/modules/applicationapp/applicationformapp/viewtemplates/applicationform.html',
                            controller: 'ApplicationFormNewCtrl'
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

angular.module('MainApp')
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        '$locationProvider',
        '$httpProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
            var navbar = {
                templateUrl: 'public/app/modules/navbarapp/viewtemplates/navbar.html',
                controller: 'NavbarCtrl'
            };
            var requireLogin = {
                requireLogin: true
            };
            var noRequiredLogin = {
                requireLogin: false
            };
            $stateProvider
                .state('LandingPage', {
                    url: '/',
                    views: {
                        "maincontent": {
                            templateUrl: 'public/viewtemplates/public/landingpage.html',
                            controller: 'landingpagectrl'
                        }
                    },
                    data: noRequiredLogin
                })
                .state('ApartmentDetails', {
                    url: '/apartmentdetails/:id',
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: 'public/viewtemplates/public/apartmentdetailspage.html',
                            controller: 'ApartmentDetailsCtrl'
                        }
                    },
                    data: noRequiredLogin
                })
                .state('ApartmentsDisplay', {
                    url: '/apartments',
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: 'public/viewtemplates/public/apartmentsdisplay.html',
                            controller: 'ApartmentsDisplayCtrl'
                        }
                    },
                    data: noRequiredLogin
                })
                .state('Blog', {
                    url: '/blog',
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: 'public/viewtemplates/public/blog.html',
                            controller: 'blogctrl'
                        }
                    },
                    data: noRequiredLogin
                })
                .state('AccountCreate', {
                    url: '/createaccount',
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: 'public/viewtemplates/public/accountcreate.html',
                            controller: 'AccountCreateCtrl'
                        }
                    },
                    data: noRequiredLogin
                })
                .state('Login', {
                    url: '/login',
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: 'public/app/modules/authapp/viewtemplates/login.html',
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
                .state('UpdatePassword', {
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
                .state('UserAccount.Dashboard', {
                    url: '/dashboard',
                    templateUrl: 'public/viewtemplates/public/account/accountmain.html',
                    controller: 'AccountCtrl',
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
                .state('Profile', {
                    url: '/profile',
                    abstract: true,
                    views:{
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: 'public/app/modules/buyerapp/profileapp/viewtemplates/profilemain.html'
                        }
                    },
                    data: {
                        requireLogin: true
                    }
                })
                .state('Profile.Create', {
                    url: '/create',
                    views: {
                        "profilepage": {
                            templateUrl: 'public/app/modules/buyerapp/profileapp/viewtemplates/profileform.html',
                            controller: 'ProfileFormCtrl'
                        }
                    }
                })
                .state('Profile.Edit', {
                    url: '/edit',
                    views: {
                        "profilepage": {
                            templateUrl: 'public/app/modules/buyerapp/profileapp/viewtemplates/profileform.html',
                            controller: 'ProfileEditCtrl'
                        }
                    }
                })
                .state('Apartment', {
                    url: '/apartment',
                    views: {
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: 'public/app/modules/apartmentapp/'
                        }
                    },
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

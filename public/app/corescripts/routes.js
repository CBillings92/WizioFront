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
                requireLogin: true,
                userType: 1
            };
            var footer = {
                  templateUrl: WizioConfig.FooterViewsURL + 'footer.html',
                  controller: 'FooterCtrl'
            };
            var trueRequiredAdmin = {
                requireLogin: true,
                userType: 0
            };
            var falseRequiredLogin = {
                requireLogin: false
            };
            $stateProvider
                .state('LandingPage', {
                    url: '/',
                    views: {
                        'footer': footer,
                        "maincontent": {
                            templateUrl: WizioConfig.landingPageAppViewsURL + 'landingpage.html',
                            controller: 'LandingPageCtrl',
                        }
                    },
                    data: falseRequiredLogin
                })
                .state('Blog', {
                    abstract: true,
                    views: {
                        'footer': footer,
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: 'public/app/modules/BlogApp/viewtemplates/blogMain.html',
                            controller: 'BlogMainCtrl'
                        }
                    },
                    data: falseRequiredLogin
                })
                .state('Blog.List', {
                    url: "/blog",
                    views: {
                        "BlogMain": {
                            templateUrl: 'public/app/modules/BlogApp/viewtemplates/blogDetail.html',
                            controller: 'BlogListCtrl'
                        }
                    }
                })
                .state('Blog.Detail', {
                    url: "/blog/:articleUrl",
                    views: {

                    }
                })
                .state('About', {
                    url: '/about',
                    views: {
                        'footer': footer,
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: 'public/app/modules/aboutUsApp/viewtemplates/aboutUs.html',
                            controller: 'AboutListCtrl'
                        }
                    },
                    data: falseRequiredLogin
                })
                .state('AdminPanel', {
                    abstract: true,
                    views: {
                        'footer': footer,
                        'navbar': navbar,
                        'maincontent': {
                            templateUrl: WizioConfig.AdminPanelAppMainViewsURL + 'AdminPanelMain.html',
                            controller: 'AdminPanelMainCtrl'
                        }
                    },
                    data: {
                        requireLogin: true,
                        userType: 0
                    }
                })
                .state('AdminPanel.Main', {
                    url: '/wizioadminpanel',
                    views: {
                        'AdminTop': {
                            templateUrl: WizioConfig.AdminPanelAppViewsURL + 'AdminSearchUnit.html',
                            controller: 'AdminSearchUnitCtrl',
                        },
                        'AdminLeft': {
                            templateUrl: WizioConfig.AdminPanelAppViewsURL + 'AdminUpdateUnit.html',
                            controller: 'AdminUpdateUnitCtrl',
                        },
                        'AdminRight': {
                            templateUrl: WizioConfig.AdminPanelAppViewsURL + 'AdminUpdateAssignment.html',
                            controller: 'AdminUpdateAssignmentCtrl'
                        }/*,
                        'AdminBottom': {
                            templateUrl: WizioConfig.AdminPanelAppViewsURL + '',
                            controller:
                        }*/
                    }
                })
                .state('Styleguide', {
                    url: '/about/styleguide',
                    views: {
                        'footer': footer,
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: 'public/viewtemplates/public/styleguide.html',
                            //The blog controller for the styleguide is temporary
                        }
                    },
                    data: falseRequiredLogin
                })
                .state('Login', {
                    url: '/login',
                    views: {
                        'footer': footer,
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
                        'footer': footer,
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: WizioConfig.AccountAuthViewsURL + 'sendResetEmail.html',
                            controller: 'AuthLoginCtrl'
                        }
                    },
                    data: falseRequiredLogin
                })
                .state('UpdatePassword', {
                    url: '/resetpassword/:token',
                    views: {
                        'footer': footer,
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: WizioConfig.AccountAuthViewsURL + 'resetPassword.html',
                            controller: 'AuthLoginCtrl'
                        }
                    },
                    data: falseRequiredLogin
                })
                .state('Account', {
                    url: '/account',
                    abstract: true,
                    views: {
                        'footer': footer,
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: WizioConfig.AccountViewsURL + 'AccountMain.html',
                            controller: 'AccountMainCtrl'
                        }
                    },
                    data: trueRequiredLogin
                })
                .state('Account.Dashboard', {
                    //url: '/dashboard',
                    abstract: true,
                    views: {
                        "AccountMain": {
                            templateUrl: WizioConfig.AccountDashboardViewsURL + 'DashboardMain.html',
                            controller: 'DashboardMainCtrl',
                        }
                    }
                })
                //auth-ify this
                .state('Account.Create', {
                    url: '/create',
                    views: {
                        "AccountMain": {
                            templateUrl: WizioConfig.AccountAuthViewsURL + '/AuthCreateAcctForm.html',
                            controller: 'AuthCreateAcctCtrl'
                        }
                    },
                    data: falseRequiredLogin
                })
                .state('Account.Dashboard.Main', {
                    url: '/dashboard',
                    views: {
                        topHorizontal: {
                            templateUrl: WizioConfig.AccountDashboardViewsURL + 'DashboardUserInfo.html',
                            controllerProvider: function($rootScope) {
                                //CHANGE-NEEDED: Implement user types -CB
                                if ($rootScope.userType == 1) {
                                    return 'DashboardUserInfoCtrl';
                                } else {
                                    return 'DashboardUserInfoCtrl';
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
                        'footer': footer,
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
                    views: {
                        'footer': footer,
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: 'public/app/modules/AccountApp/profileapp/viewtemplates/profilemain.html'
                        }
                    },
                    data: trueRequiredLogin
                })
                .state('Profile.', {
                    url: '/',
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
                        'footer': footer,
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: WizioConfig.ApplicationViewsURL + "applicationmain.html"
                        }
                    },
                    abstract: true,
                    data: trueRequiredLogin
                })
                .state('Application.New', {
                    url: '/new',
                    views: {
                        'ApplicationPage': {
                            templateUrl: WizioConfig.ApplicationFormViewsURL + 'applicationform.html',
                            controller: 'ApplicationFormCtrl'
                        }
                    }
                })
                .state('Application.Edit', {
                    url: '/edit',
                    views: {
                        'ApplicationPage': {
                            templateUrl: WizioConfig.ApplicationFormViewsURL + 'applicationform.html',
                            controller: 'ApplicationFormCtrl'
                        }
                    }
                })
                .state('Unit', {
                    url: '/unit',
                    views: {
                        'footer': footer,
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: WizioConfig.UnitViewsURL + 'UnitMain.html'
                        }
                    },
                    abstract: true
                })
                .state('Unit.', {
                    url: '/create',
                    views: {
                        'UnitMain': {
                            templateUrl: WizioConfig.UnitViewsURL + 'UnitCreate.html',
                            controller: 'UnitCreateCtrl'
                        }
                    }
                })
                .state('Unit.Details', {
                    url: '/details/:id',
                    views: {
                        "UnitMain": {
                            templateUrl: WizioConfig.UnitViewsURL + 'unitDetailsPage.html',
                            controller: 'UnitDetailCtrl'
                        }
                    },
                    data: falseRequiredLogin
                })
                .state('Unit.Display', {
                    url: '/display',
                    views: {
                        'UnitMain': {
                            templateUrl: WizioConfig.UnitViewsURL + 'unitDisplay.html',
                            controller: 'UnitDisplayCtrl'
                        }
                    }
                })
                .state('Campaign', {
                    url: '/campaign',
                    abstract: true,
                    views: {
                        'footer': footer,
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: WizioConfig.CampaignMainViewsURL + 'CampaignMain.html',
                            controller: 'CampaignMainCtrl'
                        }
                    }
                })
                .state('Campaign.VideoUpload', {
                    abstract: true,
                    views: {
                        "CampaignMain": {
                            templateUrl: WizioConfig.CampaignVideoUploadViewsURL + "/VideoUploadMain.html",
                            controller: 'VideoUploadMainCtrl'
                        }
                    }
                })
                .state('Campaign.VideoUpload.Main', {
                    url: '/apartmentshare',
                    views: {
                        "MainContent1": {
                            templateUrl: WizioConfig.CampaignVideoUploadViewsURL + '/VideoUploadSplash.html',
                            controller: 'VideoUploadSplashCtrl'
                        }
                    }
                })
                .state('Campaign.VideoUpload.Form', {
                    url: '/form',
                    views: {
                        "VideoUploadMain": {
                            templateUrl: WizioConfig.CampaignVideoUploadViewsURL + '/VideoUploadForm.html',
                            controller: 'VideoUploadFormCtrl'
                        }
                    }
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
                                if (response.data.facebook) {
                                    alert("Facebook Login Error: Please login again with facebook.");
                                    return $q.reject(response);
                                }
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

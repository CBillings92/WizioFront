angular.module('MainApp')
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        '$locationProvider',
        '$httpProvider',
        'WizioConfig',
        function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, WizioConfig) {
            var navbar = {
                templateUrl: WizioConfig.NavbarViewsURL + 'navbar.html',
                controller: 'NavbarCtrl'
            };
            var footer = {
                templateUrl: WizioConfig.FooterViewsURL + 'footer.html',
                controller: 'FooterCtrl'
            };
            var trueRequiredLogin = {
                requireLogin: true
            };
            var trueRequiredPropertyManager = {
                requireLogin: true,
                userType: 2
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
                        "navbar": navbar,
                        "footer": footer,
                        "maincontent": {
                            templateUrl: WizioConfig.landingPageAppViewsURL + 'landingpage.html',
                            controller: 'LandingPageCtrl'
                        }

                    },
                    data: falseRequiredLogin
                })
                .state('About', {
                    url: '/about',
                    views: {
                        "footer": footer,
                        "navbar": navbar,
                        "maincontent": {
                            templateUrl: 'public/app/modules/aboutusapp/viewtemplates/aboutus.html',
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
                        },
                        'AdminBottom': {
                            templateUrl: WizioConfig.AdminPanelAppViewsURL + 'admincreateunit.html',
                            controller: 'AdminCreateUnitCtrl'
                        },
                        'AdminSecondBottom': {
                            templateUrl: WizioConfig.AdminPanelAppViewsURL + 'admincreateassignment.html',
                            controller: 'AdminCreateAssignmentCtrl'
                        }
                    }
                })
                .state('AdminPanel.AddVR', {
                    url: '/wizioadminpanel/addvr',
                    views: {
                        'AdminTop': {
                            templateUrl: WizioConfig.AdminPanelAppViewsURL + 'addVRlist.html',
                            controller: 'AdminAddVrListCtrl'
                        }
                    },
                })
                .state('Styleguide', {
                    url: '/about/styleguide',
                    views: {
                        "navbar": navbar,
                        "footer": footer,
                        "maincontent": {
                            templateUrl: 'public/viewtemplates/public/styleguide.html',
                            //The blog controller for the styleguide is temporary
                        }
                    },
                    data: falseRequiredLogin
                })
                .state('SendResetEmail', {
                    url: '/sendresetpassemail',
                    views: {
                        "navbar": navbar,
                        "footer": footer,
                        "maincontent": {
                            templateUrl: WizioConfig.AccountAuthViewsURL + 'sendResetEmail.html',
                            controller: 'AuthResetPassCtrl'
                        }
                    },
                    data: falseRequiredLogin
                })
                .state('UpdatePassword', {
                    url: '/resetpassword/:token',
                    views: {
                        "navbar": navbar,
                        "footer": footer,
                        "maincontent": {
                            templateUrl: WizioConfig.AccountAuthViewsURL + 'resetPassword.html',
                            controller: 'AuthResetPassCtrl'
                        }
                    },
                    data: falseRequiredLogin
                })
                .state('Account', {
                    url: '/account',
                    abstract: true,
                    views: {
                        "navbar": navbar,
                        "footer": footer,
                        "maincontent": {
                            templateUrl: WizioConfig.AccountViewsURL + 'AccountMain.html',
                            controller: 'AccountMainCtrl'
                        }
                    },
                    data: trueRequiredLogin
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
                .state('Account.Dashboard.Main', {
                    url: '/dashboard',
                    views: {
                        topHorizontal: {
                            templateUrl: WizioConfig.AccountDashboardViewsURL + 'DashboardUserInfo.html',
                            controller: 'DashboardUserInfoCtrl'
                        },
                        controlPanel: {
                            templateUrl: WizioConfig.AccountDashboardViewsURL + 'DashboardControls.html',
                            controller: 'DashboardControlsCtrl'
                        },
                        midHorizontal: {
                            templateProvider:['TokenSvc', '$templateFactory', function(TokenSvc, $templateFactory) {
                                if (TokenSvc.decode().userType >= 2) {
                                    return $templateFactory.fromUrl(WizioConfig.AccountDashboardViewsURL + 'DashboardLLUnitList.html');
                                } else {
                                    return null;
                                }
                            }],
                            controllerProvider: ['$rootScope', function($rootScope) {
                                if ($rootScope.userType >= 2) {
                                    return 'DashboardLLUnitListCtrl';
                                } else {
                                    return null;
                                }
                            }],
                        },
                        application: {
                            templateProvider:['TokenSvc', '$templateFactory', function(TokenSvc, $templateFactory) {
                                if (TokenSvc.decode().userType == 1) {
                                    return $templateFactory.fromUrl(WizioConfig.AccountDashboardViewsURL + 'DashboardApplications.html');
                                }
                            }],
                            controllerProvider:['$rootScope', function($rootScope) {
                                if ($rootScope.userType == 1) {
                                    return 'DashboardApplicationCtrl';
                                } else {
                                    return null;
                                }
                            }]
                        },
                        favorites: {
                            templateProvider:['TokenSvc', '$templateFactory',function(TokenSvc, $templateFactory) {
                                if (TokenSvc.decode().userType == 1) {
                                    return $templateFactory.fromUrl(WizioConfig.AccountDashboardViewsURL + 'DashboardFavorites.html');
                                } else {
                                    return null;
                                }
                            }],
                            controllerProvider:['$rootScope', function($rootScope) {
                                switch ($rootScope.userType) {
                                    case 1:
                                        console.dir($rootScope.userType);
                                        return "DashboardFavoriteCtrl";
                                    case 2:

                                        break;
                                    default:
                                }
                            }],
                            data: trueRequiredLogin
                        },
                    }
                })
                .state('Account.Dashboard.Application', {
                    url: '/application',
                    views: {
                        "midHorizontal": {
                            templateUrl: WizioConfig.ApplicationFormViewsURL + 'ApplicationDetails.html',
                            controller: 'ApplicationDetailCtrl'
                        }
                    },
                    data: trueRequiredLogin
                })
                .state('Account.Lease', {
                    abstract: true,
                    url: '/lease',
                    views: {
                        AccountMain: {
                            templateUrl: WizioConfig.leaseMainViewsURL + 'leasemain.html',
                            controller: 'LeaseMainCtrl'
                        }
                    }
                })
                .state('Account.Lease.Create', {
                    url: "/create",
                    views: {
                        LeaseMain: {
                            templateUrl: WizioConfig.leaseViewsURL + 'leaseform.html',
                            controller: 'LeaseFormCtrl'
                        }
                    }
                })
                .state('Account.Lease.Edit', {
                    url: "/edit",
                    views: {
                        LeaseMain: {
                            templateUrl: WizioConfig.leaseViewsURL + 'leaseform.html',
                            controller: 'LeaseFormCtrl'
                        }
                    }
                })
                .state('Account.Profile', {
                    url: '/profile',
                    views: {
                        "AccountMain": {
                            templateUrl: WizioConfig.extProfileMainViewsURL + 'extprofilemain.html',
                            controller: 'ExtProfileMainCtrl'
                        }
                    }
                })
                .state('Account.Profile.Create', {
                    url: '/create',
                    views: {
                        "ProfileMain": {
                            templateUrl: WizioConfig.extProfileViewsURL + 'extprofileform.html',
                            controller: 'ExtProfileFormCtrl'
                        }
                    },
                    data: trueRequiredLogin
                })
                .state('Account.Profile.Edit', {
                    url: '/edit',
                    views: {
                        "ProfileMain": {
                            templateUrl: WizioConfig.extProfileViewsURL + 'extprofileform.html',
                            controller: 'ExtProfileFormCtrl'
                        }
                    },
                    data: trueRequiredLogin
                })
                .state('sellerDashboard', {
                    url: '/brokerInfo',
                    views: {
                        "navbar": navbar,
                        "footer": footer,
                        "maincontent": {
                            templateUrl: 'public/viewtemplates/public/brokerAddInfo.html',
                            controller: 'brokerAddInfoCtrl'
                        }
                    },
                    data: trueRequiredLogin
                })
                .state('Application', {
                    url: '/application',
                    views: {
                        "navbar": navbar,
                        "footer": footer,
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
                    },
                })

                .state('Unit', {
                    url: '/unit',
                    views: {
                        "navbar": navbar,
                        "footer": footer,
                        "maincontent": {
                            templateUrl: WizioConfig.UnitMainViewsURL + 'UnitMain.html',
                            controller: 'UnitMainCtrl'
                        }
                    },
                    abstract: true
                })
                .state('Unit.Create', {
                    url: '/create',
                    views: {
                        'UnitMain': {
                            templateUrl: WizioConfig.UnitViewsURL + 'UnitCreate.html',
                            controller: 'UnitCreateCtrl'
                        }
                    },
                    data: trueRequiredLogin
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
                .state('Listing', {
                    url: '/listing',
                    views: {
                        "navbar": navbar,
                        "footer": footer,
                        "maincontent": {
                            templateUrl: WizioConfig.UnitMainViewsURL + 'UnitMain.html',
                            controller: 'UnitMainCtrl'
                        }
                    },
                    abstract: true
                })
                .state('Listing.Group', {
                    url: '/:businessName/:id',
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
                    },
                    data: falseRequiredLogin
                })
                .state('Unit.Claimlist', {
                    url: '/claim/list',
                    views: {
                        "UnitMain": {
                            templateUrl: WizioConfig.UnitViewsURL + 'unitclaimlist.html',
                            controller: 'UnitClaimListCtrl'
                        }
                    },
                    data: trueRequiredLogin
                })
                .state('Unit.Claim', {
                    url: '/claim',
                    views: {
                        'UnitMain': {
                            templateUrl: WizioConfig.UnitViewsURL + 'UnitClaimForm.html',
                            controller: 'UnitClaimFormCtrl'
                        }
                    },
                    data: trueRequiredPropertyManager
                })
                .state('Unit.Edit', {
                    url: '/edit',
                    views: {
                        'UnitMain': {
                            templateUrl: WizioConfig.UnitViewsURL + 'UnitClaimForm.html',
                            controller: 'UnitClaimFormCtrl'
                        }
                    },
                    data: trueRequiredPropertyManager
                })
                .state('Campaign', {
                    url: '/campaign',
                    abstract: true,
                    views: {
                        "navbar": navbar,
                        "footer": footer,
                        "maincontent": {
                            templateUrl: WizioConfig.CampaignMainViewsURL + 'CampaignMain.html',
                            controller: 'CampaignMainCtrl'
                        }
                    },
                })
                .state('Campaign.VideoUpload', {
                    abstract: true,
                    views: {
                        "CampaignMain": {
                            templateUrl: WizioConfig.CampaignVideoUploadViewsURL + "/VideoUploadMain.html",
                            controller: 'VideoUploadMainCtrl'
                        }
                    },
                    data: falseRequiredLogin
                })
                .state('Campaign.VideoUpload.Main', {
                    url: '/apartmentupload',
                    views: {
                        "MainContent1": {
                            templateUrl: WizioConfig.CampaignVideoUploadViewsURL + '/VideoUploadSplash.html',
                            controller: 'VideoUploadSplashCtrl'
                        }
                    },
                    data: falseRequiredLogin
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

                        response: function(response) {
                            if (typeof(response.data.token) !== 'undefined' && response.data.token !== null && response.data.token) {

                                TokenSvc.storeToken(response.data.token);
                                $injector.get('$state').reload();
                                return response;
                            } else {
                                return response;
                            }
                        },
                        responseError: function(response) {
                            if (response.status === 401 || response.status === 403) {
                                TokenSvc.deleteToken();
                                if (response.data.facebook) {
                                    //alert("Facebook Login Error: Please login again with facebook.");
                                    return $q.reject(response);
                                }
                                alert('Authentication Failed');
                            }
                            return response;
                            //return $q.reject(response);
                        }

                    };
                }

            ]);
        }
    ]);

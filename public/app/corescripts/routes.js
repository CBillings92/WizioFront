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
                            templateUrl: WizioConfig.landingPageAppViewsURL + 'landingpage.view.html',
                            controller: 'LandingPageCtrl'
                        },
                        "vr-player": {
                            templateUrl: WizioConfig.UnitViewsURL + 'transition_vrplayercontainer.view.html'
                        }

                    },
                    data: falseRequiredLogin
                })
                .state('InfoDashboard', {
                    url: '/info/dashboard',
                    views: {
                        "footer": footer,
                        "maincontent": {
                            templateUrl: WizioConfig.infoAppViews + 'infoapp.dshbrd.view.html',
                            controller: 'InfoAppDashboardCtrl'
                        }

                    },
                    data: falseRequiredLogin
                })
                .state('Upload', {
                    url: '/upload',
                    views: {
                        "navbar": navbar,
                        "footer": footer,
                        "maincontent": {
                            templateUrl: 'public/app/modules/photographerapp/upload/upload.view.html',
                            controller: 'UploadPageCtrl'
                                // controller: 'UnitMediaCtrl'
                        }
                    }
                })
                .state('Tour', {
                    url: '/tour/:activelistingid',
                    views: {
                        "maincontent": {
                            templateUrl: WizioConfig.UnitViewsURL + 'transition_vrplayercontainer.view.html'
                        }
                    }
                })
                .state('Search', {
                    url: '/search',
                    params: {
                        "apartments" : null,
                    },
                    views: {
                        "navbar": navbar,
                        "footer": footer,
                        "maincontent": {
                            templateUrl: 'public/app/modules/searchapp/view.html',
                            controller: 'SearchAppCtrl',
                        }
                    }
                })
                .state('Signup', {
                    // abstract: true,
                    url: '/signup',
                    views: {
                        "footer": footer,
                        "maincontent": {
                            templateUrl: 'public/app/modules/subscriptionapp/main/subscription.main.view.html',
                            controller: 'SubscriptionMainCtrl'
                        }
                    }
                })
                .state('Signup.Invite', {
                    url: '/invite/:invitePubId',
                    views: {
                        "footer": footer,
                        "maincontent": {
                            templateUrl: 'public/app/modules/subscriptionapp/main/subscription.main.view.html',
                            controller: 'SubscriptionMainCtrl'
                        }
                    }
                })
                .state('Demo', {
                    url: '/demo',
                    views: {
                        "maincontent": {
                            templateUrl: WizioConfig.UnitViewsURL + 'transition_vrplayercontainer.view.html',
                            // controller: 'LandingPageCtrl'
                            // controller: 'UnitMediaCtrl'
                        }
                    }
                })
                .state('DemoOneBackBay', {
                    url: '/demo/backbay',
                    views: {
                        "maincontent": {
                            templateUrl: WizioConfig.UnitViewsURL + 'democontainer.view.html'
                        }
                    }
                })
                .state('DemoGreenStreet', {
                    url: '/demo/greenstreet',
                    views: {
                        "maincontent": {
                            templateUrl: WizioConfig.UnitViewsURL + 'democontainer.view.html'
                        }
                    }
                })
                .state('DemoWellington2Bed', {
                    url: '/demo/wellington',
                    views: {
                        "maincontent": {
                            templateUrl: WizioConfig.UnitViewsURL + 'democontainer.view.html'
                        }
                    }
                })
                .state('DemoWaterMarkOneBed', {
                    url: '/demo/watermark/onebed',
                    views: {
                        "maincontent": {
                            templateUrl: WizioConfig.UnitViewsURL + 'democontainer.view.html'
                        }
                    }
                })
                .state('DemoGreenWay0404', {
                    url: '/demo/greenway/0404',
                    views: {
                        "maincontent": {
                            templateUrl: WizioConfig.UnitViewsURL + 'democontainer.view.html'
                        }
                    }
                })
                .state('DemoGreenWay0512', {
                    url: '/demo/greenway/0512',
                    views: {
                        "maincontent": {
                            templateUrl: WizioConfig.UnitViewsURL + 'democontainer.view.html'
                        }
                    }
                })
                .state('DemoGreenWay0503', {
                    url: '/demo/greenway/0503',
                    views: {
                        "maincontent": {
                            templateUrl: WizioConfig.UnitViewsURL + 'democontainer.view.html'
                        }
                    }
                })
                .state('DemoGreenWay1209', {
                    url: '/demo/greenway/1209',
                    views: {
                        "maincontent": {
                            templateUrl: WizioConfig.UnitViewsURL + 'democontainer.view.html'
                        }
                    }
                })
                .state('DemoGreenWay1401', {
                    url: '/demo/greenway/1401',
                    views: {
                        "maincontent": {
                            templateUrl: WizioConfig.UnitViewsURL + 'democontainer.view.html'
                        }
                    }
                })
                .state('DemoGreenWay1707', {
                    url: '/demo/greenway/1707',
                    views: {
                        "maincontent": {
                            templateUrl: WizioConfig.UnitViewsURL + 'democontainer.view.html'
                        }
                    }
                })
                .state('DemoMetroMark04', {
                    url: '/demo/metromark/04',
                    views: {
                        "maincontent": {
                            templateUrl: WizioConfig.UnitViewsURL + 'democontainer.view.html'
                        }
                    }
                })
                .state('DemoMetroMark06', {
                    url: '/demo/metromark/06',
                    views: {
                        "maincontent": {
                            templateUrl: WizioConfig.UnitViewsURL + 'democontainer.view.html'
                        }
                    }
                })
                .state('DemoMetroMark12', {
                    url: '/demo/metromark/12',
                    views: {
                        "maincontent": {
                            templateUrl: WizioConfig.UnitViewsURL + 'democontainer.view.html'
                        }
                    }
                })
                .state('DemoMetroMark13', {
                    url: '/demo/metromark/13',
                    views: {
                        "maincontent": {
                            templateUrl: WizioConfig.UnitViewsURL + 'democontainer.view.html'
                        }
                    }
                })
                .state('DemoRiversEdgeB1', {
                    url: '/demo/riversedge/b1',
                    views: {
                        "maincontent": {
                            templateUrl: WizioConfig.UnitViewsURL + 'democontainer.view.html'
                        }
                    }
                })
                .state('DemoRiversEdgeA2', {
                    url: '/demo/riversedge/a2',
                    views: {
                        "maincontent": {
                            templateUrl: WizioConfig.UnitViewsURL + 'democontainer.view.html'
                        }
                    }
                })
                .state('DemoRiversEdgeA9', {
                    url: '/demo/riversedge/a9',
                    views: {
                        "maincontent": {
                            templateUrl: WizioConfig.UnitViewsURL + 'democontainer.view.html'
                        }
                    }
                })
                .state('DemoStationLanding1', {
                    url: '/demo/stationlanding/1',
                    views: {
                        "maincontent": {
                            templateUrl: WizioConfig.UnitViewsURL + 'democontainer.view.html'
                        }
                    }
                })
                .state('DemoStationLanding1C', {
                    url: '/demo/stationlanding/1c',
                    views: {
                        "maincontent": {
                            templateUrl: WizioConfig.UnitViewsURL + 'democontainer.view.html'
                        }
                    }
                })
                .state('DemoStationLanding2', {
                    url: '/demo/stationlanding/2',
                    views: {
                        "maincontent": {
                            templateUrl: WizioConfig.UnitViewsURL + 'democontainer.view.html'
                        }
                    }
                })
                .state('DemoStationLanding24W', {
                    url: '/demo/stationlanding/24w',
                    views: {
                        "maincontent": {
                            templateUrl: WizioConfig.UnitViewsURL + 'democontainer.view.html'
                        }
                    }
                })
                .state('DemoStationLanding26E', {
                    url: '/demo/stationlanding/26e',
                    views: {
                        "maincontent": {
                            templateUrl: WizioConfig.UnitViewsURL + 'democontainer.view.html'
                        }
                    }
                })
                .state('DemoStationLandingStudioB', {
                    url: '/demo/stationlanding/studiob',
                    views: {
                        "maincontent": {
                            templateUrl: WizioConfig.UnitViewsURL + 'democontainer.view.html'
                        }
                    }
                })
                .state('DemoEddyD', {
                    url: '/demo/theeddy/d',
                    views: {
                        "maincontent": {
                            templateUrl: WizioConfig.UnitViewsURL + 'democontainer.view.html'
                        }
                    }
                })
                .state('DemoEddyBB', {
                    url: '/demo/theeddy/bb',
                    views: {
                        "maincontent": {
                            templateUrl: WizioConfig.UnitViewsURL + 'democontainer.view.html'
                        }
                    }
                })
                .state('DemoEddyCC', {
                    url: '/demo/theeddy/cc',
                    views: {
                        "maincontent": {
                            templateUrl: WizioConfig.UnitViewsURL + 'democontainer.view.html'
                        }
                    }
                })
                .state('DemoEddyK', {
                    url: '/demo/theeddy/k',
                    views: {
                        "maincontent": {
                            templateUrl: WizioConfig.UnitViewsURL + 'democontainer.view.html'
                        }
                    }
                })
                .state('NewExternalApi', {
                    url: '/listing/vr/:apitoken/:apartmentpubid',
                    views: {
                        "maincontent": {
                            templateUrl: WizioConfig.UnitViewsURL + 'transition_vrplayercontainer.view.html'
                        }
                    },
                    data: falseRequiredLogin
                })
                .state('Externalapi', {
                    url: '/listing/vr/:apitoken/:apartmentpubid',
                    views: {
                        "maincontent": {
                            templateUrl: WizioConfig.UnitViewsURL + 'democontainer.view.html',
                        }
                    },
                    data: falseRequiredLogin
                })
                .state('Externalapiv2', {
                    url: '/listing/vr/:apitoken/:apartmentpubid',
                    views: {
                        "maincontent": {
                            templateUrl: WizioConfig.UnitViewsURL + 'unitmedia.views.html',
                            controller: 'UnitMediaCtrl'
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
                .state('Photographer', {
                    // abstract: true,
                    url: '/photographer',
                    views: {
                        "navbar": navbar,
                        "footer": footer,
                        "maincontent": {
                            templateUrl: 'public/app/modules/photographerapp/main/photographer-main.view.html',
                            // controller: 'LandingPageCtrl'
                        }

                    }

                })
                .state('Photographer.Track', {
                    url: '/track',
                    views: {
                        'test': {
                            // templateUrl: '',
                            templateUrl: 'public/app/modules/photographerapp/tracker/photographer-track.view.html',
                            controller: 'PhotographerTrackCtrl',
                        }
                    }
                })
                .state('Photographer.UploadFloorPlan', {
                    url: '/upload/floorplan',
                    views: {
                        'test': {
                            templateUrl: 'public/app/modules/photographerapp/floorplanupload/floorplanupload.view.html',
                            controller: 'FloorPlanUploadCtrl',
                        }
                    }
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

            .state('AdminPanel.ApiAccessTool', {
                    url: '/wizioadminpanel/apiaccesstool',
                    views: {
                        'AdminTop': {
                            templateUrl: WizioConfig.AdminPanelAppViewsURL + 'adminapiaccesstool.view.html',
                            controller: 'AdminPanelApiAccessCtrl'
                        }
                    }
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
                .state('Apiguide', {
                    url: '/about/api',
                    views: {
                        "navbar": navbar,
                        "footer": footer,
                        "maincontent": {
                            templateUrl: 'public/app/modules/aboutusapp/viewtemplates/apiguide.view.html',
                            controller: 'ApiGuideCtrl'
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
                    url: '/dashboard',
                    views: {
                        "AccountMain": {
                            templateUrl: WizioConfig.AccountDashboardViewsURL + 'dashboard.view.html',
                            controller: 'DashboardCtrl',
                        }
                    }
                })
                .state('Account.Dashboard.Main', {
                    abstract: true,
                    views: {
                        topHorizontal: {
                            templateUrl: WizioConfig.AccountDashboardViewsURL + 'DashboardUserInfo.html',
                            controller: 'DashboardUserInfoCtrl'
                        }
                    }
                })
                .state('Account.Dashboard.Broker', {
                    views: {
                        topHorizontal: {
                            templateUrl: WizioConfig.AccountDashboardViewsURL + 'DashboardUserInfo.html',
                            controller: 'DashboardUserInfoCtrl'
                        },
                        controlPanel: {
                            templateUrl: WizioConfig.AccountDashboardViewsURL + 'DashboardControls.html',
                            controller: 'DashboardControlsCtrl',
                        },
                        midHorizontal: {
                            templateUrl: WizioConfig.AccountDashboardViewsURL + 'DashboardLLUnitList.html',
                            controller: 'DashboardLLUnitListCtrl'
                        }
                    },
                    data: trueRequiredLogin
                })
                .state('Account.Dashboard.PropertyManager', {
                    views: {
                        topHorizontal: {
                            templateUrl: WizioConfig.AccountDashboardViewsURL + 'DashboardUserInfo.html',
                            controller: 'DashboardUserInfoCtrl'
                        },
                        controlPanel: {
                            templateUrl: WizioConfig.AccountDashboardViewsURL + 'DashboardControls.html',
                            controller: 'DashboardControlsCtrl',
                        },
                        midHorizontal: {
                            templateUrl: WizioConfig.AccountDashboardViewsURL + 'DashboardLLUnitList.html',
                            controller: "DashboardLLUnitListCtrl",
                        }

                    },
                    data: trueRequiredLogin
                })
                .state('Account.Dashboard.Tenant', {
                    views: {
                        topHorizontal: {
                            templateUrl: WizioConfig.AccountDashboardViewsURL + 'DashboardUserInfo.html',
                            controller: 'DashboardUserInfoCtrl'
                        },
                        controlPanel: {
                            templateUrl: WizioConfig.AccountDashboardViewsURL + 'DashboardControls.html',
                            controller: 'DashboardControlsCtrl',
                        },
                        favorites: {
                            templateUrl: WizioConfig.AccountDashboardViewsURL + 'DashboardFavorites.html',
                            controller: "DashboardFavoriteCtrl"
                        },
                        application: {
                            templateUrl: WizioConfig.AccountDashboardViewsURL + 'DashboardApplications.html',
                            controller: "DashboardApplicationCtrl"
                        },
                    },
                    data: trueRequiredLogin
                })
                .state('Account.Pay', {
                    url: '/pay',
                    views: {
                        'AccountMain': {
                            templateUrl: WizioConfig.AccountDashboardViewsURL + 'payment.html',
                            controller: 'PaymentCtrl'
                        }
                    },
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
                .state('Listing.National', {
                    url: '/national',
                    views: {
                        "UnitMain": {
                            templateUrl: WizioConfig.UnitViewsURL + 'NationalUnits.html',
                            controller: 'NationalCtrl'
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
                });
            $urlRouterProvider.otherwise('/');

            $httpProvider.interceptors.push([
                '$q',
                '$location',
                '$localStorage',
                '$rootScope',
                '$injector',
                'TokenSvc',
                function($q, $location, $localStorage, $rootScope, $injector, TokenSvc) {
                    var requestCount = 0;
                    return {
                        request: function(config) {
                            requestCount++;
                            config.headers = config.headers || {};
                            // console.dir(requestCount);
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
                            requestCount--
                            if(requestCount === 0){
                                $rootScope.$emit('siteLoadDone', {});
                            }
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
                                alert('Authentication Failed');
                            }
                            return response;
                            //return $q.reject(response);
                        }

                    };
                }

            ]);
            $locationProvider.html5Mode(true);
        }
    ]);

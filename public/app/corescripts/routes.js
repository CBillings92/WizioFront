angular.module("MainApp").config([
  "$stateProvider",
  "$urlRouterProvider",
  "$locationProvider",
  "$httpProvider",
  "WizioConfig",
  function(
    $stateProvider,
    $urlRouterProvider,
    $locationProvider,
    $httpProvider,
    WizioConfig
  ) {
    var navbar = {
      templateUrl: WizioConfig.NavbarViewsURL + "navbar.html",
      controller: "NavbarCtrl"
    };
    var footer = {
      templateUrl: WizioConfig.FooterViewsURL + "footer.html",
      controller: "FooterCtrl"
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
    var PAGECONFIG = WizioConfig.pages;
    $stateProvider
      .state("LandingPage", {
        url: "/",
        views: {
          navbar: navbar,
          footer: footer,
          maincontent: {
            templateUrl: PAGECONFIG.landingPage.main.view,
            controller: PAGECONFIG.landingPage.main.controller
          },
          "vr-player": {
            templateUrl:
              WizioConfig.UnitViewsURL +
              "transition_vrplayercontainer.view.html"
          }
        },
        data: falseRequiredLogin
      })
      .state("InfoDashboard", {
        url: "/info/dashboard",
        views: {
          footer: footer,
          maincontent: {
            templateUrl: WizioConfig.infoAppViews + "infoapp.dshbrd.view.html",
            controller: "InfoAppDashboardCtrl"
          }
        },
        data: falseRequiredLogin
      })
      .state("Upload", {
        url: "/upload",
        views: {
          navbar: navbar,
          footer: footer,
          maincontent: {
            templateUrl:
              "public/app/modules/photographerapp/upload/upload.view.html",
            controller: "UploadPageCtrl"
          }
        }
      })
      .state("TourManagement", {
        url: "/tour/management",
        views: {
          navbar: navbar,
          footer: footer,
          maincontent: {
            templateUrl: PAGECONFIG.dashboard.TourMgmtApp.main.view,
            controller: PAGECONFIG.dashboard.TourMgmtApp.main.controller
          }
        },
        params: { data: null, action: null }
      })
      .state("Tour", {
        url: "/tour/:activelistingid",
        views: {
          maincontent: {
            templateUrl: PAGECONFIG.tourApp.main.view,
            controller: PAGECONFIG.tourApp.main.controller
          }
        }
      })
      .state("Search", {
        url: "/search",
        params: {
          apartments: null
        },
        views: {
          navbar: navbar,
          footer: footer,
          maincontent: {
            templateUrl: "public/app/modules/searchapp/view.html",
            controller: "SearchAppCtrl"
          }
        }
      })
      .state("Product", {
        url: "/product",
        views: {
          navbar: navbar,
          footer: footer,
          maincontent: {
            templateUrl: PAGECONFIG.productInfo.main.view,
            controller: PAGECONFIG.productInfo.main.controller
          }
        }
      })
      .state("ListingTest", {
        url: "/listing/test",
        views: {
          footer: footer,
          maincontent: {
            templateUrl:
              "public/app/modules/listing-page-app/listing-page.html",
            controller: PAGECONFIG.listingPage.main.controller
          }
        }
      })
      .state("ListingDemo1", {
        url: "/listing/a3885803-1100-450f-931d-fbb53b6ed410",
        views: {
          footer: footer,
          maincontent: {
            templateUrl:
              "public/app/modules/listing-page-app/listing-page-demo-one/listing-page.html",
            controller: "ListingPageDemo1Ctrl"
          }
        }
      })
      .state("Listing", {
        url: "/listing/:listingUUID",
        views: {
          footer: footer,
          maincontent: {
            templateUrl:
              "public/app/modules/listing-page-app/listing-page.html",
            controller: "ListingPageCtrl"
          }
        }
      })
      .state("ListingDemo2", {
        url: "/listing/demo/2",
        views: {
          footer: footer,
          maincontent: {
            templateUrl:
              "public/app/modules/listing-page-app/listing-page-demo-two/listing-page.html",
            controller: "ListingPageDemo2Ctrl"
          }
        }
      })
      .state("Signup", {
        url: "/signup",
        views: {
          footer: footer,
          maincontent: {
            templateUrl: PAGECONFIG.createAccount.main.view,
            controller: PAGECONFIG.createAccount.main.controller
          }
        }
      })
      .state("Signup.Invite", {
        url: "/invite/:invitePubId",
        views: {
          footer: footer,
          maincontent: {
            templateUrl:
              "public/app/modules/subscriptionapp/main/subscription.main.view.html",
            controller: "SubscriptionMainCtrl"
          }
        }
      })
      .state("Demo", {
        url: "/demo",
        views: {
          maincontent: {
            templateUrl: PAGECONFIG.tourApp.main.view,
            controller: PAGECONFIG.tourApp.main.controller
          }
        }
      })
      .state("NewExternalApi", {
        url: "/listing/vr/:apitoken/:apartmentpubid",
        views: {
          maincontent: {
            templateUrl:
              WizioConfig.UnitViewsURL +
              "transition_vrplayercontainer.view.html"
          }
        },
        data: falseRequiredLogin
      })
      .state("Externalapi", {
        url: "/listing/vr/:apitoken/:apartmentpubid",
        views: {
          maincontent: {
            templateUrl: WizioConfig.UnitViewsURL + "democontainer.view.html"
          }
        },
        data: falseRequiredLogin
      })
      .state("Externalapiv2", {
        url: "/listing/vr/:apitoken/:apartmentpubid",
        views: {
          maincontent: {
            templateUrl: WizioConfig.UnitViewsURL + "unitmedia.views.html",
            controller: "UnitMediaCtrl"
          }
        },
        data: falseRequiredLogin
      })
      .state("About", {
        url: "/about",
        views: {
          navbar: navbar,
          footer: footer,
          maincontent: {
            templateUrl: PAGECONFIG.about.view,
            controller: PAGECONFIG.about.controller
          }
        },
        data: falseRequiredLogin
      })
      .state("Photographer", {
        url: "/photographer",
        views: {
          navbar: navbar,
          footer: footer,
          maincontent: {
            templateUrl:
              "public/app/modules/photographerapp/main/photographer-main.view.html"
          }
        }
      })
      .state("Photographer.Track", {
        url: "/track",
        views: {
          test: {
            templateUrl:
              "public/app/modules/photographerapp/tracker/photographer-track.view.html",
            controller: "PhotographerTrackCtrl"
          }
        }
      })
      .state("Photographer.UploadFloorPlan", {
        url: "/upload/floorplan",
        views: {
          test: {
            templateUrl:
              "public/app/modules/photographerapp/floorplanupload/floorplanupload.view.html",
            controller: "FloorPlanUploadCtrl"
          }
        }
      })
      .state("AdminPanel", {
        abstract: true,
        views: {
          footer: footer,
          navbar: navbar,
          maincontent: {
            templateUrl:
              WizioConfig.AdminPanelAppMainViewsURL + "AdminPanelMain.html",
            controller: "AdminPanelMainCtrl"
          }
        }
      })
      .state("AdminPanel.Main", {
        url: "/wizioadminpanel",
        views: {
          AdminTop: {
            templateUrl:
              WizioConfig.AdminPanelAppViewsURL + "AdminSearchUnit.html",
            controller: "AdminSearchUnitCtrl"
          },
          AdminLeft: {
            templateUrl:
              WizioConfig.AdminPanelAppViewsURL + "AdminUpdateUnit.html",
            controller: "AdminUpdateUnitCtrl"
          },
          AdminRight: {
            templateUrl:
              WizioConfig.AdminPanelAppViewsURL + "AdminUpdateAssignment.html",
            controller: "AdminUpdateAssignmentCtrl"
          },
          AdminBottom: {
            templateUrl:
              WizioConfig.AdminPanelAppViewsURL + "admincreateunit.html",
            controller: "AdminCreateUnitCtrl"
          },
          AdminSecondBottom: {
            templateUrl:
              WizioConfig.AdminPanelAppViewsURL + "admincreateassignment.html",
            controller: "AdminCreateAssignmentCtrl"
          }
        }
      })
      .state("AdminPanel.AddVR", {
        url: "/wizioadminpanel/addvr",
        views: {
          AdminTop: {
            templateUrl: WizioConfig.AdminPanelAppViewsURL + "addVRlist.html",
            controller: "AdminAddVrListCtrl"
          }
        }
      })

      .state("AdminPanel.ApiAccessTool", {
        url: "/wizioadminpanel/apiaccesstool",
        views: {
          AdminTop: {
            templateUrl:
              WizioConfig.AdminPanelAppViewsURL +
              "adminapiaccesstool.view.html",
            controller: "AdminPanelApiAccessCtrl"
          }
        }
      })
      .state("Styleguide", {
        url: "/about/styleguide",
        views: {
          navbar: navbar,
          footer: footer,
          maincontent: {
            templateUrl: PAGECONFIG.styleguide.main.view
          }
        },
        data: falseRequiredLogin
      })
      .state("Apiguide", {
        url: "/about/api",
        views: {
          navbar: navbar,
          footer: footer,
          maincontent: {
            templateUrl: PAGECONFIG.apiguide.main.view,
            controller: PAGECONFIG.apiguide.main.controller
          }
        },
        data: falseRequiredLogin
      })
      .state("UpdatePassword", {
        url: "/resetpassword/:token",
        views: {
          navbar: navbar,
          footer: footer,
          maincontent: {
            templateUrl:
              "public/app/modules/change-password-app/change-password-form/change-password.form.view.html",
            controller: "ChangePasswordFormCtrl"
          }
        },
        data: falseRequiredLogin
      })
      .state("Account", {
        url: "/account",
        abstract: true,
        views: {
          navbar: navbar,
          footer: footer,
          maincontent: {
            templateUrl: WizioConfig.AccountViewsURL + "AccountMain.html",
            controller: "AccountMainCtrl"
          }
        },
        data: trueRequiredLogin
      })
      //auth-ify this
      .state("Account.Create", {
        url: "/create",
        views: {
          AccountMain: {
            templateUrl:
              WizioConfig.AccountAuthViewsURL + "/AuthCreateAcctForm.html",
            controller: "AuthCreateAcctCtrl"
          }
        },
        data: falseRequiredLogin
      })
      .state("Account.Dashboard", {
        url: "/dashboard",
        views: {
          AccountMain: {
            templateUrl: PAGECONFIG.dashboard.main.view,
            controller: PAGECONFIG.dashboard.main.controller
          }
        }
      })
      .state("Account.Dashboard.ShareTour", {
        views: {
          "dashboard-main": {
            templateUrl: PAGECONFIG.dashboard.shareTour.view
          }
        }
      })
      .state("Account.Dashboard.Invite", {
        views: {
          "dashboard-main": {
            templateUrl: PAGECONFIG.dashboard.invite.view,
            controller: PAGECONFIG.dashboard.invite.controller
          }
        }
      })
      .state("Account.Dashboard.Search", {
        views: {
          "dashboard-main": {
            templateUrl: PAGECONFIG.dashboard.search.view,
            controller: PAGECONFIG.dashboard.search.controller
          }
        }
      })
      .state("Account.Dashboard.AgentInfo", {
        views: {
          "dashboard-main": {
            templateUrl: PAGECONFIG.dashboard.agentInfo.view,
            controller: PAGECONFIG.dashboard.agentInfo.controller
          }
        }
      })
      .state("Account.Dashboard.ReassignTours", {
        views: {
          "dashboard-main": {
            templateUrl: PAGECONFIG.dashboard.reassignTours.view,
            controller: PAGECONFIG.dashboard.reassignTours.controller
          }
        }
      })
      .state("Account.Pay", {
        url: "/pay",
        views: {
          AccountMain: {
            templateUrl: WizioConfig.AccountDashboardViewsURL + "payment.html",
            controller: "PaymentCtrl"
          }
        }
      })
      .state("Account.Profile", {
        url: "/profile",
        views: {
          AccountMain: {
            templateUrl:
              WizioConfig.extProfileMainViewsURL + "extprofilemain.html",
            controller: "ExtProfileMainCtrl"
          }
        }
      })
      .state("Account.Profile.Create", {
        url: "/create",
        views: {
          ProfileMain: {
            templateUrl: WizioConfig.extProfileViewsURL + "extprofileform.html",
            controller: "ExtProfileFormCtrl"
          }
        },
        data: trueRequiredLogin
      })
      .state("Account.Profile.Edit", {
        url: "/edit",
        views: {
          ProfileMain: {
            templateUrl: WizioConfig.extProfileViewsURL + "extprofileform.html",
            controller: "ExtProfileFormCtrl"
          }
        },
        data: trueRequiredLogin
      })
      .state("TermsOfService", {
        url: "/termsofservice",
        views: {
          navbar: navbar,
          footer: footer,
          maincontent: {
            templateUrl: PAGECONFIG.termsOfService.view
          }
        }
      })
      .state("PrivacyPolicy", {
        url: "/privacypolicy",
        views: {
          navbar: navbar,
          footer: footer,
          maincontent: {
            templateUrl: PAGECONFIG.privacyPolicy.view
          }
        }
      })
      .state("Application", {
        url: "/application",
        views: {
          navbar: navbar,
          footer: footer,
          maincontent: {
            templateUrl:
              WizioConfig.ApplicationViewsURL + "applicationmain.html"
          }
        },
        abstract: true,
        data: trueRequiredLogin
      })
      .state("Application.New", {
        url: "/new",
        views: {
          ApplicationPage: {
            templateUrl:
              WizioConfig.ApplicationFormViewsURL + "applicationform.html",
            controller: "ApplicationFormCtrl"
          }
        }
      })
      .state("Application.Edit", {
        url: "/edit",
        views: {
          ApplicationPage: {
            templateUrl:
              WizioConfig.ApplicationFormViewsURL + "applicationform.html",
            controller: "ApplicationFormCtrl"
          }
        }
      })

      .state("Unit", {
        url: "/unit",
        views: {
          navbar: navbar,
          footer: footer,
          maincontent: {
            templateUrl: WizioConfig.UnitMainViewsURL + "UnitMain.html",
            controller: "UnitMainCtrl"
          }
        },
        abstract: true
      })
      .state("Unit.Create", {
        url: "/create",
        views: {
          UnitMain: {
            templateUrl: WizioConfig.UnitViewsURL + "UnitCreate.html",
            controller: "UnitCreateCtrl"
          }
        },
        data: trueRequiredLogin
      })
      .state("Unit.Details", {
        url: "/details/:id",
        views: {
          UnitMain: {
            templateUrl: WizioConfig.UnitViewsURL + "unitDetailsPage.html",
            controller: "UnitDetailCtrl"
          }
        },
        data: falseRequiredLogin
      })
      // .state("Listing", {
      //   url: "/listing",
      //   views: {
      //     navbar: navbar,
      //     footer: footer,
      //     maincontent: {
      //       templateUrl: WizioConfig.UnitMainViewsURL + "UnitMain.html",
      //       controller: "UnitMainCtrl"
      //     }
      //   },
      //   abstract: true
      // })
      .state("Listing.Group", {
        url: "/:businessName/:id",
        views: {
          UnitMain: {
            templateUrl: WizioConfig.UnitViewsURL + "unitDetailsPage.html",
            controller: "UnitDetailCtrl"
          }
        },
        data: falseRequiredLogin
      })
      .state("Listing.National", {
        url: "/national",
        views: {
          UnitMain: {
            templateUrl: WizioConfig.UnitViewsURL + "NationalUnits.html",
            controller: "NationalCtrl"
          }
        },
        data: falseRequiredLogin
      })
      .state("Privacy", {
        url: "/privacy",
        onEnter: function() {
          window.open(
            "https://drive.google.com/open?id=0B0d2YtuXJgS5UFZBT1NRVUdvM1k",
            "_self"
          );
        }
      })
      .state("Terms", {
        url: "/terms",
        onEnter: function() {
          window.open(
            "https://docs.google.com/document/d/1mazUTtcp2nqhOGhJNoxYA9CmaZR1gtY6Jv8R961fuhM",
            "_self"
          );
        }
      })
      .state("AcceptableUse", {
        url: "/use",
        onEnter: function() {
          window.open(
            "https://drive.google.com/open?id=0B0d2YtuXJgS5VlRnV042cTBabEU",
            "_self"
          );
        }
      })
      .state("Unit.Display", {
        url: "/display",
        views: {
          UnitMain: {
            templateUrl: WizioConfig.UnitViewsURL + "unitDisplay.html",
            controller: "UnitDisplayCtrl"
          }
        },
        data: falseRequiredLogin
      })
      .state("Unit.Claimlist", {
        url: "/claim/list",
        views: {
          UnitMain: {
            templateUrl: WizioConfig.UnitViewsURL + "unitclaimlist.html",
            controller: "UnitClaimListCtrl"
          }
        },
        data: trueRequiredLogin
      })
      .state("Unit.Claim", {
        url: "/claim",
        views: {
          UnitMain: {
            templateUrl: WizioConfig.UnitViewsURL + "UnitClaimForm.html",
            controller: "UnitClaimFormCtrl"
          }
        },
        data: trueRequiredPropertyManager
      })
      .state("Unit.Edit", {
        url: "/edit",
        views: {
          UnitMain: {
            templateUrl: WizioConfig.UnitViewsURL + "UnitClaimForm.html",
            controller: "UnitClaimFormCtrl"
          }
        },
        data: trueRequiredPropertyManager
      })
      .state("Market", {
        url: "/market/:agentid",
        views: {
          navbar: navbar,
          footer: footer,
          maincontent: {
            templateUrl: PAGECONFIG.Market.LandingPage.View,
            controller: PAGECONFIG.Market.LandingPage.Ctrl
          }
        }
      })
      .state("SearchMarket", {
        url: "/search/:area",
        views: {
          navbar: navbar,
          footer: footer,
          maincontent: {
            templateUrl: PAGECONFIG.Market.SearchPage.View,
            controller: PAGECONFIG.Market.SearchPage.Ctrl
          }
        }
      })
    $urlRouterProvider.otherwise("/");

    $httpProvider.interceptors.push([
      "$q",
      "$location",
      "$localStorage",
      "$rootScope",
      "$injector",
      "TokenSvc",
      function($q, $location, $localStorage, $rootScope, $injector, TokenSvc) {
        var requestCount = 0;
        return {
          request: function(config) {
            requestCount++;
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
            requestCount--;
            if (requestCount === 0) {
              $rootScope.$emit("siteLoadDone", {});
            }
            if (response.data.token) {
              TokenSvc.storeToken(response.data.token);
              $injector.get("$state").reload();
            }
            if (response.data.payload && response.data.payload.token) {
              TokenSvc.storeToken(response.data.payload.token);
              $injector.get("$state").reload();
            }

            return response;
          },
          responseError: function(response) {
            if (response.status === 401 || response.status === 403) {
              TokenSvc.deleteToken();
            }
            return response;
          }
        };
      }
    ]);
    $locationProvider.html5Mode(true);
  }
]);

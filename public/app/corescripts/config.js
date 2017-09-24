angular.module('MainApp').constant('WizioConfig', (function() {
  //BACK END SERVER URL
  //
  //The following line should be uncometed before testing on vagrant on your local machine
  /*
      PRODUCTION URL

      */
  //PRODUCTION
  //baseAPIURL: 'http://cbProdTestServer-zh7mseyghz.elasticbeanstalk.com/api/',
  //LOCAL URL
  //baseAPIURL: 'http://TESTENV-haje6dk4hy.elasticbeanstalk.com/api/',
  var env = checkEnvironment();
  var MODULESPATH = 'public/app/modules/';

  function checkEnvironment() {
    switch (window.location.origin) {
      case "http://172.16.0.2:3000":
        return 'dev';
      case "http://alphafront.rc9igeipqw.us-east-1.elasticbeanstalk.com":
        return 'test';
      case "https://alpha.wizio.co":
        return 'test';
      case "http://alpha.wizio.co":
        return 'test';
      case "http://beta.wizio.co":
        return 'prod';
      case "http://wizio.co":
        return 'prod';
      case "http://www.wizio.co":
        return 'prod';
      case "https://wizio.co":
        return 'prod';
      case "https://www.wizio.co":
        return 'prod';
      default:
        return "dev";
    }
  }

  return {
    ENV: env,
    baseAPIURL: (function() {
      switch (env) {
        case 'dev':
          return 'http://172.16.0.3:4000/api/';
        case 'test':
          return 'http://alpha-api.wizio.co/api/';
        case 'prod':
          return 'https://api.wizio.co/api/';
        default:
          return 'http://172.16.0.3:4000/api/';
      }
    }()),
    S3_EQUIRECTPHOTOS_BUCKET: env === 'prod' ?
      'wizio-client-tour-photos' : 'test-equirect-photos',
    CLOUDFRONT_DISTRO: env === 'prod' ? 'https://cdn.wizio.co/' : 'https://d1mze0h82dkhhe.cloudfront.net/',
    CLOUDFRONT_DISTRO_UPLOAD_URL: env === 'prod' ? 'https://d9cm2bybwkl75.cloudfront.net' : 'https://d3hemhuxs42asx.cloudfront.net',
    frontEndURL: window.location.origin,

    // FOR DISPLAYING DEMO AND LANDING PAGE TOURS
    LandingPage: {
      activeListingId: function() {
        var activeListingId = env === 'test' || env === 'dev' ?
          'ddef35a3-0afb-4e8c-97b5-60e057004034' :
          'ddef35a3-0afb-4e8c-97b5-60e057004034'
        return activeListingId;
      }
    },

    DemoPage: {
      activeListingId: function() {
        var activeListingId = env === 'test' || env === 'dev' ?
          'ddef35a3-0afb-4e8c-97b5-60e057004034' :
          'ddef35a3-0afb-4e8c-97b5-60e057004034';
        return activeListingId;
      }
    },

    //angular app URLs - views
    modulesURL: 'public/app/modules',
    PhotographerApp: {
      Views: {
        CreateUnitModal: MODULESPATH + 'photographerapp/CreateUnit/createunit.modal.view.html',
        UploadFloorPlanDescision: MODULESPATH + 'photographerapp/UploadFloorPlanDecision/uploadfloorplandecision.modal.html',
        UploadFloorPlan: MODULESPATH + 'photographerapp/UploadFloorPlan/uploadfloorplan.view.html'
      }
    },
    TourPasswordApp: {
      Views: {
        TourPasswordConfirmModal: MODULESPATH + 'tourpasswordapp/tourpasswordconfirm.modal.html'
      }
    },
    //AdminPanel App
    AdminPanelAppMainViewsURL: MODULESPATH + 'adminpanelapp/main/',
    AdminPanelAppViewsURL: MODULESPATH + 'adminpanelapp/viewtemplates/',
    //AuthApp
    AuthViewsURL: MODULESPATH + 'authapp/viewtemplates/',
    //Application App
    ApplicationViewsURL: MODULESPATH + 'applicationapp/main/',
    ApplicationFormViewsURL: MODULESPATH + 'applicationapp/applicationformapp/viewtemplates/',

    BuyerDashboardViewsURL: MODULESPATH + 'accountapp/dashboard/viewtemplates/',
    //Footer Views
    FooterViewsURL: MODULESPATH + 'footerapp/viewtemplates/',
    //Landing Page App
    landingPageAppViewsURL: MODULESPATH + 'landingpageapp/viewtemplates/',
    //Info app
    infoAppViews: MODULESPATH + 'infoapp/',
    //LeaseApp
    leaseMainViewsURL: MODULESPATH + 'leaseapp/main/',
    leaseViewsURL: MODULESPATH + 'leaseapp/viewtemplates/',
    //Navbar Views
    NavbarViewsURL: MODULESPATH + 'navbarapp/viewtemplates/',
    //Account App
    AccountViewsURL: MODULESPATH + 'accountapp/main/',
    AccountDashboardViewsURL: MODULESPATH + 'accountapp/dashboard2app/main/',
    AccountAuthViewsURL: MODULESPATH + 'accountapp/authapp/viewtemplates/',
    UnitMainViewsURL: MODULESPATH + 'unitapp/main/',
    //Unit App
    UnitViewsURL: MODULESPATH + 'unitapp/viewtemplates/',
    extProfileMainViewsURL: MODULESPATH + 'accountapp/extendedprofileapp/main/',
    extProfileViewsURL: MODULESPATH + 'accountapp/extendedprofileapp/viewtemplates/',
    uploadViews: {
      modals: {
        renameMedia: MODULESPATH + "photographerapp/upload/rename-media.modal.view.html"
      }
    },
    pages: {
      about: {
        view: MODULESPATH + 'about-us-app/about-us.html',
        controller: 'AboutUsCtrl'
      },
      apiguide: {
        main: {
          view: MODULESPATH + 'api-guide-app/main/api-guide.html',
          controller: 'ApiGuideCtrl'
        },
        modals: {
          view: MODULESPATH + 'api-guide-app/main/api-request-modal.html',
          controller: 'ApiGuideCtrl'
        }
      },
      styleguide: {
        main: {
          view: 'public/app/modules/style-guide-app/main/styleguide.html'
        }
      },
      landingPage: {
        main: {
          view: MODULESPATH + 'landing-page-app/main/landing-page.html',
          controller: 'LandingPageCtrl',
        }
      },
      login: {
        main: {},
        modals: {
          view: MODULESPATH + 'login-app/modals/login-modal.html',
          controller: 'LoginModalCtrl'
        }
      },
      createAccount: {
        main: {
          view: MODULESPATH + 'create-account-app/main/create-account.html',
          controller: 'CreateAccountCtrl'
        }
      },
      productInfo: {
        main: {
          view: MODULESPATH + 'product-info-app/main/product.html',
          controller: 'ProductInfoCtrl'
        }
      },
      dashboard: {
        main: {
          view: MODULESPATH + 'dashboard-app/main/dashboard.html',
          controller: 'DashboardCtrl'
        },
        invite: {
          view: MODULESPATH + 'dashboard-app/invite/invite.html',
          controller: 'InviteCtrl'
        },
        search: {
          view: MODULESPATH + 'dashboard-app/search/search.html',
          controller: 'DashboardSearchCtrl'
        },
        shareTour: {
          view: MODULESPATH + 'dashboard-app/share-tour/share-tour.html',
        },
        agentInfo: {
          view: MODULESPATH + 'dashboard-app/agent-info/agent-info.html',
          controller: 'AgentInfoCtrl'
        },
        reassignTours: {
          view: MODULESPATH + 'dashboard-app/reassign-tours/reassign-tours.html',
          controller: 'ReassignToursCtrl'
        }

      },
      tourApp: {
        main: {
          view: MODULESPATH + 'tour-app/tour-app.html',
          controller: 'TourCtrl'
        }
      }
    },
    directives: {
      vrplayer: {
        main: {
          view: MODULESPATH + 'vr-player-app/main/vr-player.html',
          controller: 'VrPlayerCtrl'
        },
        interface: {
          view: MODULESPATH + 'vr-player-app/interface/interface.html',
            controller: 'InterfaceCtrl'
        }
      },
      tour: {
        view: MODULESPATH + 'tour-app/tour-app.html',
        controller: 'TourCtrl'
      },
      vrPlayerInterface: {
        view: MODULESPATH + 'vr-player-interface-app/vr-player-interface.html',
        controller: 'VrPlayerInterfaceCtrl'
      },
      tourPanel: {
        view: MODULESPATH + 'tour-panel-app/tour-panel.html',
        controller: 'TourPanelCtrl'
      }
    },
    modals: {
      deleteTourApp: {
        view: MODULESPATH + 'delete-tour-app/delete-tour-modal.html',
        controller: 'DeleteTourModalCtrl'
      },
      deleteTourConfirm: {
        view: MODULESPATH + 'delete-tour-app/delete-tour-confirm.html',
        controller: 'DeleteTourConfirmCtrl'
      },
      deactivateTourConfirm: {
        view: MODULESPATH + 'delete-tour-app/deactivate-tour-confirm.html',
        controller: 'DeactivateTourConfirmCtrl'
      },
      reassignTours: {
        main: {
          view: MODULESPATH + 'dashboard-app/reassign-tours/modal/reassign-tours-modal.html',
          controller: 'ReassignToursModalCtrl'
        },
        areYouSure: {
          view: MODULESPATH + 'dashboard-app/reassign-tours/modal/reassign-tour-confirm-modal.html',
          controller: 'ReassignTourConfirmModalCtrl'
        }
      }
    },
    directives: {
      vrplayer: {
        main: {
          view: MODULESPATH + 'vr-player-app/main/vr-player.html',
          controller: 'VrPlayerCtrl'
        },
        interface: {
          view: MODULESPATH + 'vr-player-app/interface/interface.html',
            controller: 'InterfaceCtrl'
        }
      },
      tour: {
        view: MODULESPATH + 'tour-app/tour-app.html',
        controller: 'TourCtrl'
      },
      vrPlayerInterface: {
        view: MODULESPATH + 'vr-player-interface-app/vr-player-interface.html',
        controller: 'VrPlayerInterfaceCtrl'
      },
      tourPanel: {
        view: MODULESPATH + 'tour-panel-app/tour-panel.html',
        controller: 'TourPanelCtrl'
      }
    },
    modals: {
      deleteTourApp: {
        view: MODULESPATH + 'delete-tour-app/delete-tour-modal.html',
        controller: 'DeleteTourModalCtrl'
      },
      deleteTourConfirm: {
        view: MODULESPATH + 'delete-tour-app/delete-tour-confirm.html',
        controller: 'DeleteTourConfirmCtrl'
      },
      deactivateTourConfirm: {
        view: MODULESPATH + 'delete-tour-app/deactivate-tour-confirm.html',
        controller: 'DeactivateTourConfirmCtrl'
      },
      reassignTours: {
        main: {
          view: MODULESPATH + 'dashboard-app/reassign-tours/modal/reassign-tours-modal.html',
          controller: 'ReassignToursModalCtrl'
        },
        areYouSure: {
          view: MODULESPATH + 'dashboard-app/reassign-tours/modal/reassign-tour-confirm-modal.html',
          controller: 'ReassignTourConfirmModalCtrl'
        }
      }
    },

    // STRIPE TEST KEY
    stripe_test_key: "pk_test_mngZell36UYuy8GfSSox4CZ9",
  }
})());

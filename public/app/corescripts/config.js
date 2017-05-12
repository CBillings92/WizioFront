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

    function checkEnvironment() {
        switch (window.location.origin) {
            case "http://172.16.0.2:3000":
                return 'dev';
            case "http://alphafront.rc9igeipqw.us-east-1.elasticbeanstalk.com":
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
                    return 'http://alphaserver.iv9c3ngbv7.us-east-1.elasticbeanstalk.com/api/';
                case 'prod':
                    return 'https://api.wizio.co/api/';
                default:
                    return 'http://172.16.0.3:4000/api/';
            }
        }()),
        S3_EQUIRECTPHOTOS_BUCKET: env === 'prod'
            ? 'equirect-photos'
            : 'test-equirect-photos',
        frontEndURL: window.location.origin,

        // FOR DISPLAYING DEMO AND LANDING PAGE TOURS
        LandingPage: {
            activeListingId: function() {
                var activeListingId = env === 'test'
                    ? 'a55f59b2-d99d-11e6-903a-12e04a9cd045'
                    : 'b19e3352-d9fd-11e6-85e0-0a8adbb20c4d'
                return activeListingId;
            }
        },

        DemoPage: {
            activeListingId: function() {
                var activeListingId = env === 'test'
                    ? ''
                    : 'ddef35a3-0afb-4e8c-97b5-60e057004034';
                return activeListingId;
            }
        },

        //angular app URLs - views
        modulesURL: 'public/app/modules',
        PhotographerApp: {
            Views: {
                CreateUnitModal: 'public/app/modules/photographerapp/CreateUnit/createunit.modal.view.html',
                UploadFloorPlanDescision: 'public/app/modules/photographerapp/UploadFloorPlanDecision/uploadfloorplandecision.modal.html',
                UploadFloorPlan: 'public/app/modules/photographerapp/UploadFloorPlan/uploadfloorplan.view.html'
            }
        },
        TourPasswordApp: {
            Views: {
                TourPasswordConfirmModal: 'public/app/modules/tourpasswordapp/tourpasswordconfirm.modal.html'
            }
        },
        //AdminPanel App
        AdminPanelAppMainViewsURL: 'public/app/modules/adminpanelapp/main/',
        AdminPanelAppViewsURL: 'public/app/modules/adminpanelapp/viewtemplates/',
        //AuthApp
        AuthViewsURL: 'public/app/modules/authapp/viewtemplates/',
        //Application App
        ApplicationViewsURL: 'public/app/modules/applicationapp/main/',
        ApplicationFormViewsURL: 'public/app/modules/applicationapp/applicationformapp/viewtemplates/',

        BuyerDashboardViewsURL: 'public/app/modules/accountapp/dashboard/viewtemplates/',
        //Footer Views
        FooterViewsURL: 'public/app/modules/footerapp/viewtemplates/',
        //Landing Page App
        landingPageAppViewsURL: 'public/app/modules/landingpageapp/viewtemplates/',
        //Info app
        infoAppViews: 'public/app/modules/infoapp/',
        //LeaseApp
        leaseMainViewsURL: 'public/app/modules/leaseapp/main/',
        leaseViewsURL: 'public/app/modules/leaseapp/viewtemplates/',
        //Navbar Views
        NavbarViewsURL: 'public/app/modules/navbarapp/viewtemplates/',
        //Account App
        AccountViewsURL: 'public/app/modules/accountapp/main/',
        AccountDashboardViewsURL: 'public/app/modules/accountapp/dashboard2app/main/',
        AccountAuthViewsURL: 'public/app/modules/accountapp/authapp/viewtemplates/',
        UnitMainViewsURL: 'public/app/modules/unitapp/main/',
        //Unit App
        UnitViewsURL: 'public/app/modules/unitapp/viewtemplates/',
        extProfileMainViewsURL: 'public/app/modules/accountapp/extendedprofileapp/main/',
        extProfileViewsURL: 'public/app/modules/accountapp/extendedprofileapp/viewtemplates/',
        uploadViews: {
            modals: {
                renameMedia: "public/app/modules/photographerapp/upload/rename-media.modal.view.html"
            }
        },
        pages: {
            about: {
                view: 'public/app/modules/about-us-app/about-us.html',
                controller: 'AboutUsCtrl'
            },
            apiguide: {
                main: {
                    view: 'public/app/modules/api-guide-app/main/api-guide.html',
                    controller: 'ApiGuideCtrl'
                },
                modals: {
                    view: 'public/app/modules/api-guide-app/main/api-request-modal.html',
                    controller: 'ApiGuideCtrl'
                }
            },
            styleguide: {
                main: {
                    view: 'pubilc/app/modules/style-guide-app/main/style-guide.html'
                }
            }
        },

        // STRIPE TEST KEY
        stripe_test_key: "pk_test_mngZell36UYuy8GfSSox4CZ9",
        static_vr: (function() {
            var data = {
                landingpage: {
                    apartmentpubid: null
                },
                demo: {
                    apartmentpubid: null
                },
                demoOneBackBay: {
                    apartmentpubid: null
                },
                demoGreenStreet: {
                    apartmentpubid: null
                },
                demoWellington2Bed: {
                    apartmentpubid: null
                },
                demoWaterMarkOneBed: {
                    apartmentpubid: null
                },
                demoGreenWay0404: {
                    apartmentpubid: null
                },
                demoGreenWay0503: {
                    apartmentpubid: null
                },
                demoGreenWay0512: {
                    apartmentpubid: null
                },
                demoGreenWay1209: {
                    apartmentpubid: null
                },
                demoGreenWay1401: {
                    apartmentpubid: null
                },
                demoGreenWay1707: {
                    apartmentpubid: null
                },
                demoMetroMark04: {
                    apartmentpubid: null
                },
                demoMetroMark06: {
                    apartmentpubid: null
                },
                demoMetroMark12: {
                    apartmentpubid: null
                },
                demoMetroMark13: {
                    apartmentpubid: null
                },
                demoRiversEdgeB1: {
                    apartmentpubid: null
                },
                demoRiversEdgeA2: {
                    apartmentpubid: null
                },
                demoRiversEdgeA9: {
                    apartmentpubid: null
                },
                demoStationLanding1: {
                    apartmentpubid: null
                },
                demoStationLanding1C: {
                    apartmentpubid: null
                },
                demoStationLanding2: {
                    apartmentpubid: null
                },
                demoStationLanding24W: {
                    apartmentpubid: null
                },
                demoStationLanding26E: {
                    apartmentpubid: null
                },
                demoStationLandingStudioB: {
                    apartmentpubid: null
                },
                demoEddyD: {
                    apartmentpubid: null
                },
                demoEddyBB: {
                    apartmentpubid: null
                },
                demoEddyCC: {
                    apartmentpubid: null
                },
                demoEddyK: {
                    apartmentpubid: null
                },
                apikey: null
            };

            // var prod = {
            //
            // };
            // var test = {
            //
            // };
            switch (env) {
                case "dev":
                    data.apikey = 'b04fa14a-3486-11e6-85e0-0a8adbb20c4d';
                    data.demo.apartmentpubid = 'cdd02606-bfc7-4aec-90c9-ed78c1462661';
                    data.landingpage.apartmentpubid = 'b4a4b637-b585-4f21-8f5d-32a382a2ee15';
                    data.demoOneBackBay.apartmentpubid = 'b170e44b-e859-4c53-b126-614fbf8e1c86';
                    data.demoGreenStreet.apartmentpubid = '2b48a77d-cf3d-45ed-a8fe-f752d55e027e';
                    data.demoWellington2Bed.apartmentpubid = '5d65b2a1-5067-44d4-ae75-5ff7bf8127ac';
                    // data.demoWaterMarkOneBed.apartmentpubid = 'ccf9ac72-601e-427b-8898-7ca367cc86e1';
                    return data;
                case "test":
                    data.apikey = 'b04fa14a-3486-11e6-85e0-0a8adbb20c4d';
                    data.demo.apartmentpubid = 'cdd02606-bfc7-4aec-90c9-ed78c1462661';
                    data.landingpage.apartmentpubid = 'b4a4b637-b585-4f21-8f5d-32a382a2ee15';
                    data.demoOneBackBay.apartmentpubid = 'b170e44b-e859-4c53-b126-614fbf8e1c86';
                    data.demoGreenStreet.apartmentpubid = '2b48a77d-cf3d-45ed-a8fe-f752d55e027e';
                    data.demoWellington2Bed.apartmentpubid = '5d65b2a1-5067-44d4-ae75-5ff7bf8127ac';
                    return data;
                case "prod":
                    data.apikey = 'a2d53f52-7979-11e6-85e0-0a8adbb20c4d';
                    data.demo.apartmentpubid = 'cdd02606-bfc7-4aec-90c9-ed78c1462661';
                    data.landingpage.apartmentpubid = 'b4a4b637-b585-4f21-8f5d-32a382a2ee15';
                    data.demoOneBackBay.apartmentpubid = 'b170e44b-e859-4c53-b126-614fbf8e1c86';
                    data.demoGreenStreet.apartmentpubid = '2b48a77d-cf3d-45ed-a8fe-f752d55e027e';
                    data.demoWaterMarkOneBed.apartmentpubid = 'ccf9ac72-601e-427b-8898-7ca367cc86e1';
                    data.demoWellington2Bed.apartmentpubid = '53508b28-caed-4958-99a9-ef1b89b3c70d';
                    data.demoGreenWay0404.apartmentpubid = 'f78a349b-96b8-4b83-b470-7df789bebf32';
                    data.demoGreenWay0503.apartmentpubid = 'c87a0162-27f1-4862-ae4e-32c4f74f1c0d';
                    data.demoGreenWay0512.apartmentpubid = '07c5e21f-d7c9-4ae6-83b8-a8b0d88492c7';
                    data.demoGreenWay1209.apartmentpubid = 'f341d89a-5574-4dbc-a786-cf931ee89620';
                    data.demoGreenWay1401.apartmentpubid = 'ae6fa9b3-34b5-4010-9de3-8f006eea9ca2';
                    data.demoGreenWay1707.apartmentpubid = 'dae5df4c-6149-4bec-82f3-a12c4dd5c067';
                    data.demoMetroMark04.apartmentpubid = '40391eab-8c85-4e12-ac58-296bff64cc98';
                    data.demoMetroMark06.apartmentpubid = '4a8f7cf5-21cf-4665-b472-72faf83fb583';
                    data.demoMetroMark12.apartmentpubid = '89beaef2-8864-4488-8ecb-be81ccf6b7e7';
                    data.demoMetroMark13.apartmentpubid = '38b4b736-f7dc-4da0-ad9c-94899d516db9';
                    data.demoRiversEdgeB1.apartmentpubid = '4384fc6d-967f-429c-8894-2e38fde18e54';
                    data.demoRiversEdgeA2.apartmentpubid = '987f8160-8229-4a79-b51d-d17975f01804';
                    data.demoRiversEdgeA9.apartmentpubid = 'b6aae3d0-2ada-40ca-91c1-54ab87dde49e';
                    data.demoStationLanding1.apartmentpubid = 'e3cc5db2-ebf8-473c-8696-0c21d9caa3d2';
                    data.demoStationLanding1C.apartmentpubid = '57934872-c858-43a3-b69f-60b33985963a';
                    data.demoStationLanding2.apartmentpubid = '1878da61-1334-43f1-9c99-68cd45783bde';
                    data.demoStationLanding24W.apartmentpubid = '29ed2132-0a02-4205-91d8-e30d23378f0d';
                    data.demoStationLanding26E.apartmentpubid = 'adaea09c-69ae-4aed-a11b-33a697f32304';
                    data.demoStationLandingStudioB.apartmentpubid = 'af7b3c43-44d7-4ee5-8183-ce5b7ee3677f';
                    data.demoEddyD.apartmentpubid = 'c08f0dbc-6910-4c7e-9084-af5351696653';
                    data.demoEddyBB.apartmentpubid = 'a0dde313-fe71-4988-adc1-a187b943625f';
                    data.demoEddyCC.apartmentpubid = '110a0962-172d-4c81-b85a-3276070053c2';
                    data.demoEddyK.apartmentpubid = '6e9049a5-a823-4ccb-b625-8fe7616afdcc';
                    return data;
                default:
                    data.apikey = 'bb4b58d2-4e8b-4155-a736-b5d233ca03aa';
                    data.demo.apartmentpubid = 'd5ee04bb-6d52-11e6-8edc-0800274a1eca';
                    data.landingpage.apartmentpubid = 'd5ee04bb-6d52-11e6-8edc-0800274a1eca';
                    return data;
            }
        }())
    }
})());

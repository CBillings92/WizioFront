angular.module('MainApp')
    .constant('WizioConfig', (function() {
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
                default:
                    return "dev";
            }
        }

        return {
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
            //LIVETESTER URL
            // baseAPIURL: 'http://betaTestProd.iv9c3ngbv7.us-east-1.elasticbeanstalk.com/api/',


            //FRONT END SERVER URL
            //This frontEndURL may seem pointless, its NOT, go to sharedfactories map function to find out why we need it
            //
            //The following line should be uncometed before testing on vagrant on your local machine
            //frontEndURL: 'http://beta.wizio.co/',
            //
            //The following line should be uncometed before pushing to the AWS elasticbeanstalk server
            //frontEndURL: 'http://frontbeta-4qbeydmczn.elasticbeanstalk.com/',
            //frontEndURL: 'http://MatanBetaTest-j5t4cpkddg.elasticbeanstalk.com/',
            //frontEndURL: 'http://TESTENVF-4tjbtepvhi.elasticbeanstalk.com/',
            frontEndURL: window.location.origin,


            //angular app URLs - views
            //
            modulesURL: 'public/app/modules',
            //AdminPanel App
            AdminPanelAppMainViewsURL: 'public/app/modules/adminpanelapp/main/',
            AdminPanelAppViewsURL: 'public/app/modules/adminpanelapp/viewtemplates/',
            //AuthApp
            AuthViewsURL: 'public/app/modules/authapp/viewtemplates/',
            //Application App
            ApplicationViewsURL: 'public/app/modules/applicationapp/main/',
            ApplicationFormViewsURL: 'public/app/modules/applicationapp/applicationformapp/viewtemplates/',

            BuyerDashboardViewsURL: 'public/app/modules/accountapp/dashboard/viewtemplates/',
            //Campaign App
            CampaignMainViewsURL: 'public/app/modules/campaignapp/main/',
            CampaignVideoUploadViewsURL: 'public/app/modules/campaignapp/videouploadapp/viewtemplates/',
            //Footer Views
            FooterViewsURL: 'public/app/modules/footerapp/viewtemplates/',
            //Landing Page App
            landingPageAppViewsURL: 'public/app/modules/landingpageapp/viewtemplates/',
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
            tenantSurveyFormViews: 'public/app/modulse/tenantsurvey/',
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
                    demoGreenWay0512:{
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
                    apikey: null
                };

                // var prod = {
                //
                // };
                // var test = {
                //
                // };
                console.dir(env);
                switch (env) {
                    case "dev":
                        data.apikey = 'bb4b58d2-4e8b-4155-a736-b5d233ca03aa';
                        data.landingpage.apartmentpubid = 'b9114993-172f-4729-b375-aed0dc9101c6';
                        data.demoOneBackBay.apartmentpubid = 'b170e44b-e859-4c53-b126-614fbf8e1c86';
                        data.demo.apartmentpubid = 'b9114993-172f-4729-b375-aed0dc9101c6';
                        data.demoGreenStreet.apartmentpubid = '2b48a77d-cf3d-45ed-a8fe-f752d55e027e';
                        data.demoWellington2Bed.apartmentpubid = '5d65b2a1-5067-44d4-ae75-5ff7bf8127ac';
                        // data.demoWaterMarkOneBed.apartmentpubid = 'ccf9ac72-601e-427b-8898-7ca367cc86e1';
                        return data;
                    case "test":
                        data.apikey = '59d41d7c-d116-47de-a1cd-2de04e282841';
                        data.demo.apartmentpubid = '8d0248bc-2e4b-43ba-9ff8-01e76bbe1259';
                        data.landingpage.apartmentpubid = '8d0248bc-2e4b-43ba-9ff8-01e76bbe1259';
                        return data;
                    case "prod":
                        data.apikey = 'a2d53f52-7979-11e6-85e0-0a8adbb20c4d';
                        data.demo.apartmentpubid = 'cdd02606-bfc7-4aec-90c9-ed78c1462661';
                        data.landingpage.apartmentpubid = 'b4a4b637-b585-4f21-8f5d-32a382a2ee15';
                        data.demoOneBackBay.apartmentpubid = 'b170e44b-e859-4c53-b126-614fbf8e1c86';
                        data.demoGreenStreet.apartmentpubid = '2b48a77d-cf3d-45ed-a8fe-f752d55e027e';
                        data.demoWaterMarkOneBed.apartmentpubid = 'ccf9ac72-601e-427b-8898-7ca367cc86e1';
                        data.demoGreenWay0404.apartmentpubid = 'f78a349b-96b8-4b83-b470-7df789bebf32';
                        data.demoGreenWay0503.apartmentpubid = 'c87a0162-27f1-4862-ae4e-32c4f74f1c0d';
                        data.demoGreenWay0512.apartmentpubid = '07c5e21f-d7c9-4ae6-83b8-a8b0d88492c7';
                        data.demoGreenWay1209.apartmentpubid = 'f341d89a-5574-4dbc-a786-cf931ee89620';
                        data.demoGreenWay1401.apartmentpubid = 'ae6fa9b3-34b5-4010-9de3-8f006eea9ca2';
                        data.demoGreenWay1707.apartmentpubid = 'dae5df4c-6149-4bec-82f3-a12c4dd5c067';
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

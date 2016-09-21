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
                        data.apikey = 'bb4b58d2-4e8b-4155-a736-b5d233ca03aa';
                        data.landingpage.apartmentpubid = 'b9114993-172f-4729-b375-aed0dc9101c6';
                        data.demoOneBackBay.apartmentpubid = 'b170e44b-e859-4c53-b126-614fbf8e1c86';
                        data.demo.apartmentpubid = 'b9114993-172f-4729-b375-aed0dc9101c6';
                        data.demoGreenStreet.apartmentpubid = '2b48a77d-cf3d-45ed-a8fe-f752d55e027e';
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

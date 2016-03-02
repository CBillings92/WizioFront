angular.module('MainApp')
.constant('WizioConfig', {

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
    //baseAPIURL: 'http://172.16.0.3:4000/api/',



    //LIVETESTER URL
    baseAPIURL: 'betaTestProd.iv9c3ngbv7.us-east-1.elasticbeanstalk.com/api/',


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
    FooterViewsURL:  'public/app/modules/footerapp/viewtemplates/',
    //Landing Page App
    landingPageAppViewsURL: 'public/app/modules/landingpageapp/viewtemplates/',
    //LeaseApp
    leaseMainViewsURL: 'public/app/modules/leaseapp/main/',
    leaseViewsURL: 'public/app/modules/leaseapp/viewtemplates/',
    //Navbar Views
    NavbarViewsURL: 'public/app/modules/navbarapp/viewtemplates/',
    //Account App
    AccountViewsURL: 'public/app/modules/accountapp/main/',
    AccountDashboardViewsURL: 'public/app/modules/accountapp/dashboardapp/viewtemplates/',
    AccountAuthViewsURL: 'public/app/modules/accountapp/authapp/viewtemplates/',
    UnitMainViewsURL: 'public/app/modules/unitapp/main/',
    //Unit App
    UnitViewsURL: 'public/app/modules/unitapp/viewtemplates/',
    extProfileMainViewsURL: 'public/app/modules/accountapp/extendedprofileapp/main/',
    extProfileViewsURL: 'public/app/modules/accountapp/extendedprofileapp/viewtemplates/'
});

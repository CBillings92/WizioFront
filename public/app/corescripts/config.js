angular.module('MainApp')
.constant('WizioConfig', {

    //BACK END SERVER URL
    //
    //The following line should be uncometed before testing on vagrant on your local machine
    /*
    PRODUCTION URL

    */
    //LOCAL URL
    //baseAPIURL: 'http://172.16.0.3:4000/api/',



    //LIVETESTER URL
    baseAPIURL: 'http://TESTENV-haje6dk4hy.elasticbeanstalk.com/api/',


    //FRONT END SERVER URL
    //This frontEndURL may seem pointless, its NOT, go to sharedfactories map function to find out why we need it
    //
    //The following line should be uncometed before testing on vagrant on your local machine
    frontEndURL: 'http://TESTENVF-4tjbtepvhi.elasticbeanstalk.com/',
    //
    //The following line should be uncometed before pushing to the AWS elasticbeanstalk server
    //frontEndURL: 'http://frontbeta-4qbeydmczn.elasticbeanstalk.com/',
    //frontEndURL: 'http://MatanBetaTest-j5t4cpkddg.elasticbeanstalk.com/',
    //fonrtEndUrl: 'http://172.16.0.2:3000/',




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
    ApplicationFormViewsURL: 'public/app/modules/applicationapp/applicationformapp/viewtemplates',
    ApplicationWaitlistViewsURL: 'public/app/modules/applicationapp/waitlistapp/viewtemplates/',
    //Blog App
    BlogViewsURL: 'public/app/modules/blogApp/viewtemplates/',
    BuyerViewsURL: 'public/app/modules/accountapp/viewtemplates/',

    BuyerDashboardViewsURL: 'public/app/modules/accountapp/dashboard/viewtemplates/',
    //Campaign App
    CampaignMainViewsURL: 'public/app/modules/campaignapp/main/',
    CampaignVideoUploadViewsURL: 'public/app/modules/campaignapp/videouploadapp/viewtemplates/',
    //Landing Page App
    landingPageAppViewsURL: 'public/app/modules/landingpageapp/viewtemplates/',
    //Navbar Views
    NavbarViewsURL: 'public/app/modules/navbarapp/viewtemplates/',
    //Footer Views
    FooterViewsURL:  'public/app/modules/footerapp/viewtemplates/',
    //Account App
    AccountViewsURL: 'public/app/modules/accountapp/main/',
    AccountDashboardViewsURL: 'public/app/modules/accountapp/dashboardapp/viewtemplates/',
    AccountAuthViewsURL: 'public/app/modules/accountapp/authapp/viewtemplates/',
    UnitMainViewsURL: 'public/app/modules/unitapp/main/',
    //Unit App
    UnitViewsURL: 'public/app/modules/unitapp/viewtemplates/',
});

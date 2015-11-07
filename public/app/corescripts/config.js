angular.module('MainApp')
.constant('WizioConfig', {
    baseAPIURL: 'http://beta-aqbvfzrbbx.elasticbeanstalk.com/api/',

    //This frontEndURL may seem pointless, its NOT, go to sharedfactories map function to find out why we need it
    frontEndURL: 'http://172.16.0.2:3000/',
    //
    //angular app URLs - views
    //
    modulesURL: 'public/app/modules',
    //AdminPanel App
    AdminPanelAppMainViewsURL: 'public/app/modules/AdminPanelApp/main/',
    AdminPanelAppViewsURL: 'public/app/modules/AdminPanelApp/viewtemplates/',
    //AuthApp
    AuthViewsURL: 'public/app/modules/authapp/viewtemplates/',
    //Application App
    ApplicationViewsURL: 'public/app/modules/ApplicationApp/Main/',
    ApplicationFormViewsURL: 'public/app/modules/ApplicationApp/ApplicationFormApp/viewtemplates',
    ApplicationWaitlistViewsURL: 'public/app/modules/ApplicationApp/WaitlistApp/viewtemplates/',
    //Blog App
    BlogViewsURL: 'public/app/modules/blogApp/viewtemplates/',
    BuyerViewsURL: 'public/app/modules/accountapp/viewtemplates/',

    BuyerDashboardViewsURL: 'public/app/modules/accountapp/dashboard/viewtemplates/',
    //Campaign App
    CampaignMainViewsURL: 'public/app/modules/CampaignApp/main/',
    CampaignVideoUploadViewsURL: 'public/app/modules/CampaignApp/videouploadapp/viewtemplates/',
    //Landing Page App
    landingPageAppViewsURL: 'public/app/modules/LandingPageApp/viewtemplates/',
    //Navbar Views
    NavbarViewsURL: 'public/app/modules/navbarapp/viewtemplates/',
    //Account App
    AccountViewsURL: 'public/app/modules/accountapp/main/',
    AccountDashboardViewsURL: 'public/app/modules/accountapp/dashboardapp/viewtemplates/',
    AccountAuthViewsURL: 'public/app/modules/accountapp/authapp/viewtemplates/',
    UnitMainViewsURL: 'public/app/modules/UnitApp/main/',
    //Unit App
    UnitViewsURL: 'public/app/modules/UnitApp/viewtemplates/',
});

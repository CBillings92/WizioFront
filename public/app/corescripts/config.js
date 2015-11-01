angular.module('MainApp')
.constant('WizioConfig', {
    baseAPIURL: 'http://172.16.0.3:4000/api/',
    //
    //angular app URLs - views
    //
    modulesURL: 'public/app/modules',
    //AuthApp
    AuthViewsURL: 'public/app/modules/authapp/viewtemplates/',
    //Application App
    ApplicationViewsURL: 'public/app/modules/ApplicationApp/Main/',
    ApplicationFormViewsURL: 'public/app/modules/ApplicationApp/ApplicationFormApp/viewtemplates',
    ApplicationWaitlistViewsURL: 'public/app/modules/ApplicationApp/WaitlistApp/viewtemplates/',
    //Blog App
    BlogViewsURL: 'public/app/modules/blogApp/viewtemplates/',
    BuyerViewsURL: 'public/app/modules/AccountApp/viewtemplates/',

    BuyerDashboardViewsURL: 'public/app/modules/AccountApp/dashboard/viewtemplates/',
    //Campaign App
    CampaignMainViewsURL: 'public/app/modules/CampaignApp/main/',
    CampaignVideoUploadViewsURL: 'public/app/modules/CampaignApp/videouploadapp/viewtemplates/',
    //Landing Page App
    landingPageAppViewsURL: 'public/app/modules/LandingPageApp/viewtemplates/',
    //Navbar Views
    NavbarViewsURL: 'public/app/modules/navbarapp/viewtemplates/',
    //Account App
    AccountViewsURL: 'public/app/modules/AccountApp/main/',
    AccountDashboardViewsURL: 'public/app/modules/AccountApp/dashboardapp/viewtemplates/',
    AccountAuthViewsURL: 'public/app/modules/AccountApp/authapp/viewtemplates/',
    //Unit App
    UnitViewsURL: 'public/app/modules/UnitApp/viewtemplates/'
});

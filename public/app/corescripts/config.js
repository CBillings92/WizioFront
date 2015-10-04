angular.module('MainApp')
.constant('WizioConfig', {
    baseAPIURL: 'http://172.16.0.3:4000/api/',
    //
    //angular app URLs - views
    //
    modulesURL: 'public/app/modules',
    AuthViewsURL: 'public/app/modules/authapp/viewtemplates/',
    ApplicationViewsURL: 'public/app/modules/applicationapp/viewtemplates/',
    ApplicationFormViewsURL: 'public/app/modules/applicationapp/viewtemplates/',
    BlogViewsURL: 'public/app/modules/blogApp/viewtemplates/',
    BuyerViewsURL: 'public/app/modules/AccountApp/viewtemplates/',
    BuyerDashboardViewsURL: 'public/app/modules/AccountApp/dashboard/viewtemplates/',
    landingPageAppViewsURL: 'public/app/modules/landingpageapp/viewtemplates/',
    NavbarViewsURL: 'public/app/modules/navbarapp/viewtemplates/',
    AccountViewsURL: 'public/app/modules/AccountApp/main/',
    AccountDashboardViewsURL: 'public/app/modules/AccountApp/dashboardapp/viewtemplates/',
    AccountAuthViewsURL: 'public/app/modules/AccountApp/authapp/viewtemplates/',
    UnitViewsURL: 'public/app/modules/UnitApp/viewtemplates/'
});

angular.module('MainApp')
.constant('WizioConfig', {
    baseAPIURL: 'http://localhost:4000/api/',
    //
    //angular app URLs - views
    //
    modulesURL: 'public/app/modules',
    AuthViewsURL: 'public/app/modules/authapp/viewtemplates/',
    ApplicationViewsURL: 'public/app/modules/applicationapp/viewtemplates/',
    ApplicationFormViewsURL: 'public/app/modules/applicationapp/viewtemplates/',
    BlogViewsURL: 'public/app/modules/blogApp/viewtemplates/',
    BuyerViewsURL: 'public/app/modules/buyerapp/viewtemplates/',
    BuyerDashboardViewsURL: 'public/app/modules/buyerapp/dashboard/viewtemplates/',
    landingPageAppViewsURL: 'public/app/modules/landingpageapp/viewtemplates/',
    NavbarViewsURL: 'public/app/modules/navbarapp/viewtemplates/',
    SellerViewsURL: 'public/app/modules/sellerapp/viewtemplates/',
    SellerDashboardViewsURL: 'public/app/modules/sellerapp/dashboard/viewtemplates/',
    UnitViewsURL: 'public/app/modules/UnitApp/viewtemplates'
});

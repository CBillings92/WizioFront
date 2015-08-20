angular.module('LandingPageApp', []);

angular.module('MainApp', [
    'LandingPageApp',
    'ui.router',
    'ngStorage',
    'ngResource',
    'ngLodash',
])
.run([
    '$rootScope',
    '$state',
    '$http',
    '$localStorage',
    function($rootScope, $state, $http, $cookies, $localStorage){
        console.dir("test");
    }
]);

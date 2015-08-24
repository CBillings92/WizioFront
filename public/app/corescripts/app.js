angular.module('LandingPageApp', []);
angular.module('AccountCreateApp', []);
angular.module('SharedResourcesApp', []);

angular.module('MainApp', [
    'LandingPageApp',
    'AccountCreateApp',
    'ui.router',
    'ngStorage',
    'ngResource',
    'ngLodash',
    'SharedResourcesApp',
    'ui.bootstrap'
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

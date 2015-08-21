angular.module('BlogApp', []);
angular.module('LandingPageApp', []);
angular.module('UserCreateApp', []);

angular.module('MainApp', [
    'BlogApp',
    'LandingPageApp',
    'UserCreateApp',
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

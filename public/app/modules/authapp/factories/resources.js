angular.module('AuthApp')
.factory('AuthRegisterResource', [
    '$resource',
    'WizioConfig',
    function($resource, WizioConfig){
        return $resource(WizioConfig.baseAPIURL + 'user/registration');
    }
])
.factory('AuthLoginResource', [
    '$resource',
    'WizioConfig',
    function($resource, WizioConfig){
        return $resource(WizioConfig.baseAPIURL + 'user/authenticate');
    }
]);

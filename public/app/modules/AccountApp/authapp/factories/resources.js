angular.module('AuthApp')
.factory('AuthLoginResource', [
    '$resource',
    'WizioConfig',
    function($resource, WizioConfig){
        return $resource(WizioConfig.baseAPIURL + 'user/authenticate');
    }
])
//sendresetpassemail
.factory('AuthResetPasswordResource', [
    '$resource',
    'WizioConfig',
    function($resource, WizioConfig) {
        return $resource(WizioConfig.baseAPIURL + "user/forgotpassword");
    }

])
//updatepassword
.factory('AuthUpdatePasswordResource', [
    '$resource',
    'WizioConfig',
    function($resource, WizioConfig) {
        return $resource(WizioConfig.baseAPIURL + "user/updatepassword");
    }
])
//registration
.factory('AuthRegistrationResource', [
    '$resource',
    'WizioConfig',
    function($resource, WizioConfig) {
        return $resource(WizioConfig.baseAPIURL + "user/registration");
    }
]);

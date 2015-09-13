angular.module('ApplicationApp')
.factory('ApplicationResource', [
    '$resource',
    'WizioConfig',
    function($resource, WizioConfig){
        return $resource(WizioConfig.baseAPIURL + 'application');
    }
]);

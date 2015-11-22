angular.module('ApplicationApp')
.factory('ApplicationResource', [
    '$resource',
    'WizioConfig',
    function($resource, WizioConfig){
        return $resource(WizioConfig.baseAPIURL + 'application/:item/:action', {item: '@item', action: '@action'},
        {
            save: {
                method: 'POST',
                isArray: true
            }
        });
    }
]);

angular.module('ApplicationApp')
.factory('ApplicationResource', [
    '$resource',
    'WizioConfig',
    function($resource, WizioConfig){
        return $resource(WizioConfig.baseAPIURL + 'application/:item', {item: '@item'},
        {
            save: {
                method: 'POST',
                isArray: true
            }
        });
    }
]);

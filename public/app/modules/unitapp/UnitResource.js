angular.module('UnitApp')
.factory('UnitResource', [
    '$resource',
    'WizioConfig',
    function($resource, WizioConfig){
        return $resource(WizioConfig.baseAPIURL + 'apartment/:id', {id: '@id'});
    }
])

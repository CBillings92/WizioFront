angular.module('AdminPanelApp')
.factory('AdminPanelResource', [
    '$resource',
    'WizioConfig',
    function($resource, WizioConfig){
        return $resource(WizioConfig.baseAPIURL + 'admin/:item/:action', {item: '@item', action: '@action'});
    }
]);

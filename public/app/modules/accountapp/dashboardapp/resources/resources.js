angular.module('AccountApp')
.factory('AssignmentResource', [
    '$resource',
    'WizioConfig',
    function($resource, WizioConfig){
        return $resource(WizioConfig.baseAPIURL + 'assignment');
    }
])
.factory('FavoriteResource', [
    '$resource',
    'WizioConfig',
    function($resource, WizioConfig){
        return $resource(WizioConfig.baseAPIURL + 'user/favorite');
    }
]);

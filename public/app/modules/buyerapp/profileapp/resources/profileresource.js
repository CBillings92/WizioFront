angular.module('SellerApp')
.factory('ProfileResource', [
    '$resource',
    'WizioConfig',
    function($resource, WizioConfig){
        return $resource(WizioConfig.baseAPIURL + 'profile');
    }
]);

angular.module('SellerApp')
.factory('sellerResource', [
    '$resource',
    function($resource){
        return $resource('http://localhost:4000/api/broker/:action', {action: '@action'});
    }
]);

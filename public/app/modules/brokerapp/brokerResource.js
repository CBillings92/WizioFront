angular.module('BrokerApp')
.factory('brokerResource', [
    '$resource',
    function($resource){
        return $resource('http://localhost:4000/api/broker/:action', {action: '@action'});
    }
]);

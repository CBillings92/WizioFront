angular.module('ApartmentsApp')
.factory('ApartmentResource', [
    '$resource',
    function($resource){
        return $resource('http://localhost:4000/api/apartment/:id', {id: '@id'});
    }
]);

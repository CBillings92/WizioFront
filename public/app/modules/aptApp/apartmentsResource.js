angular.module('aptApp')
.factory('apartmentResource', [
    '$resource',
    function($resource){
        return $resource('http://localhost:4000/api/apartment/:id', {id: '@id'});
    }
]);

angular.module('SharedResourcesApp')
.factory('registration', [
    '$resource',
    function($resource){
        return $resource("http://localhost:4000/api/user/registration");
    }
]);

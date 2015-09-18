angular.module('sharedFactoriesApp')
    .factory('search', [
        '$resource',
        function($resource) {
            return $resource("http://localhost:4000/api/search/:flag/:searchString", {
                flag: "@flag",
                searchString: "@searchString"
            });
        }
    ])
    .factory('registration', [
        '$resource',
        function($resource) {
            return $resource("http://localhost:4000/api/user/registration");
        }
    ])
    .factory('ApplicationResource', [
        '$resource',
        function($resource){
            return $resource("http://localhost:4000/api/profile");
        }
    ]);

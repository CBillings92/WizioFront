angular.module('SharedFactoriesApp')
    .factory('Search', [
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
    ]);

angular.module('SharedFactoriesApp')
    .factory('Search', [
        '$resource',
        'WizioConfig',
        function($resource, WizioConfig) {
            return $resource(WizioConfig.baseAPIURL + "search/:flag/:searchString", {
                flag: "@flag",
                searchString: "@searchString"
            });
        }
    ]);

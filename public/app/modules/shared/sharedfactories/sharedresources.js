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
    ])
    .factory('registration', [
        '$resource',
        'WizioConfig',
        function($resource, WizioConfig) {
            return $resource(WizioConfig.baseAPIURL + "user/registration");
        }
    ])
    .factory('ApplicationResource', [
        '$resource',
        'WizioConfig',
        function($resource, WizioConfig){
            return $resource(WizioConfig.baseAPIURL + "profile");
        }
    ]);

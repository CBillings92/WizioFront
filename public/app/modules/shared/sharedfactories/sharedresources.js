angular.module('SharedFactoryApp')
    .factory('SearchResource', [
        '$resource',
        'WizioConfig',
        function($resource, WizioConfig) {
            return $resource(WizioConfig.baseAPIURL + "search/");
        }
    ]);

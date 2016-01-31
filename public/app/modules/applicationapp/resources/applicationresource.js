angular.module('ApplicationApp')
    .factory('ApplicationResource', [
        '$resource',
        'WizioConfig',
        function($resource, WizioConfig) {
            return {
                base: $resource(WizioConfig.baseAPIURL + 'application', {
                    save: {
                        method: 'POST',
                        isArray: false
                    }
                }),
                flex: $resource(WizioConfig.baseAPIURL + 'application/:item/:action', {
                    item: '@item',
                    action: '@action'
                }),
                findByAppIds: $resource(WizioConfig.baseAPIURL + 'application/ApplicationIds', {}, {
                    save: {
                        method: 'POST',
                        isArray: true
                    }
                }),
            };
        }
    ]);

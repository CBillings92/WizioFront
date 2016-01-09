angular.module('Models')
.factory('ApplicationModel', [
    '$resource',
    'WizioConfig',
    function($resource, WizioConfig){
        function Application(){
            for(var i = 0; i < arguments.length; i++){
                this[i] = arguments[i];
            }
        }

        var api = {
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
            oneParam: $resource(WizioConfig.baseAPIURL + '/application/:param1', {param1: "@param1"})
        };

        Application.api = api;

        return Application;
    }
]);

/*
    Build factories that return angular resources to handle API calls
*/
angular.module('AccountApp')
.factory('AssignmentResource', [
    '$resource',
    'WizioConfig',
    function($resource, WizioConfig){
        return $resource(WizioConfig.baseAPIURL + 'assignment');
    }
])
//for dashboard related resources
.factory('DashboardResources', [
    '$resource',
    'WizioConfig',
    function($resource, WizioConfig) {
        /*
            angular resource for VRAPI
            expects inputs to be strings
            "param1/", ":param2/", ":param3"
            = http://api.wizio.co/api/vrapi/param1/param2/param3
        */
        function vrapi() {
            var requestString;
            //loop through function arguments and append to each other
            //to build the string
            for(var i = 0; i < vrapi.arguments; i++){
                requestString += vrapi.arguments[i];
            }
            //return the resource built with the request parameters passed in
            return $resource(WizioConfig.baseAPIURL + requestString);
        }
        return {
            vrapi: vrapi
        };
    }
])
.factory('FavoriteResource', [
    '$resource',
    'WizioConfig',
    function($resource, WizioConfig){
        return $resource(WizioConfig.baseAPIURL + 'user/favorite');
    }
]);

/*
    APIGuide factory to store $resource requests. returns promises
*/
angular.module('ApiGuideApp')
    .factory('ApiGuideFct', [
        '$resource',
        '$q',
        function ($resource, $q) {
            function requestAPIKey(apirequest) {
                $resource(WizioConfig.baseAPIURL + 'vr/requestmoreinfo')
                    .save({apirequest: apirequest}, function(response){
                        alert("Thanks for contacting us! We'll get back to you as soon as we can.");
                        return resolve('success');
                    });
            }
            return {
                requestAPIKey: requestAPIKey
            }
        }
    ])

/*
    APIGuide factory to store $resource requests. returns promises
*/
angular.module('ApiGuideApp')
    .factory('ApiGuideFct', [
        '$resource',
        '$q',
        'ModalBuilderFct',
        function ($resource, $q, ModalBuilderFct) {
            function requestAPIKey(apirequest) {
                return $q(function(resolve, reject){
                    $resource(WizioConfig.baseAPIURL + 'vr/requestmoreinfo')
                    .save({apirequest: apirequest}, function(response){
                        ModalBuilderFct.buildSimpleModal(
                            "",
                            "OK",
                            "Success",
                            "Thanks for contacting us! We'll get back to you as soon as we can."
                        ).then(function(result) {
                            return resolve(result);
                        });
                    });
                });
            }
            return {
                requestAPIKey: requestAPIKey
            };
        }
    ]);

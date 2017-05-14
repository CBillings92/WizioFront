/*
    Modal that submits a request for an API key at www.wizio.co/about/api
*/
angular.module('ApiGuideApp')
    .controller('ApiRequestModalCtrl', [
        '$scope',
        '$uibModalInstance',
        'ApiRequestFct',
        'WizioConfig',
        function FeedbackModalCtrl($scope, $uibModalInstance, ApiRequestFct, WizioConfig) {

            // Submit an API Request
            $scope.submit = function(){
                ApiRequestFct.requestAPIKey($scope.apirequest)
                .then(function(response){
                    $uibModalInstance.close();
                })
            };

            // Close Modal with 'x' control
            $scope.closeModal = function() {
                $uibModalInstance.close();
            };

        }
    ]);

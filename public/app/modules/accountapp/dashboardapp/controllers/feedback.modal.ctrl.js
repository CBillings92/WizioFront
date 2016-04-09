angular.module('AccountApp')
    .controller('FeedbackModalCtrl', [
        '$scope',
        '$uibModalInstance',
        '$resource',
        'WizioConfig',
        function FeedbackModalCtrl($scope, $uibModalInstance, $resource, WizioConfig) {
            $scope.submit = function(){
                $resource(WizioConfig.baseAPIURL + 'propertymanager/feedback')
                    .save({feedback: $scope.feedback}, function(response){
                        alert("success");
                    });
            };
            $scope.closeModal = function() {
                $uibModalInstance.close();
            };

        }
    ]);

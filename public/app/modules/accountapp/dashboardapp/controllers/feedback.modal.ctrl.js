angular.module('AccountApp')
    .controller('FeedbackModalCtrl', [
        '$scope',
        '$modalInstance',
        '$resource',
        'WizioConfig',
        function FeedbackModalCtrl($scope, $modalInstance, $resource, WizioConfig) {
            $scope.submit = function(){
                $resource(WizioConfig.baseAPIURL + 'propertymanager/feedback')
                    .save({feedback: $scope.feedback}, function(response){
                        alert("success");
                    });
            };
            $scope.closeModal = function() {
                $modalInstance.close();
            };

        }
    ]);

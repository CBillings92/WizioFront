angular.module('AboutUsApp')
    .controller('ApiRequestModalCtrl', [
        '$scope',
        '$uibModalInstance',
        '$resource',
        'WizioConfig',
        function FeedbackModalCtrl($scope, $uibModalInstance, $resource, WizioConfig) {
            $scope.submit = function(){
                $resource(WizioConfig.baseAPIURL + 'vr/requestmoreinfo')
                    .save({apirequest: $scope.apirequest}, function(response){
                        alert("Thanks for contacting us! We'll get back to you as soon as we can.");
                        $uibModalInstance.close();
                    });
            };
            $scope.closeModal = function() {
                $uibModalInstance.close();
            };

        }
    ]);

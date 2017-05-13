angular.module('AboutUsApp')
    .controller('ApiRequestModalCtrl', [
        '$scope',
        '$uibModalInstance',
        '$resource',
        'WizioConfig',
        'ModalBuilderFct',
        function FeedbackModalCtrl($scope, $uibModalInstance, $resource, WizioConfig, ModalBuilderFct) {
            $scope.submit = function(){
                $resource(WizioConfig.baseAPIURL + 'vr/requestmoreinfo')
                    .save({apirequest: $scope.apirequest}, function(response){
                        ModalBuilderFct.buildSimpleModal(
                            "",
                            "OK",
                            "Success",
                            'Thanks for contacting us! We\'ll get back to you as soon as we can.'
                        ).then(function(result) {
                            return;
                        });

                        $uibModalInstance.close();
                    });
            };
            $scope.closeModal = function() {
                $uibModalInstance.close();
            };

        }
    ]);

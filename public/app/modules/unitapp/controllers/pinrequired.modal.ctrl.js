angular.module("UnitApp")
    .controller('PinRequiredModalCtrl', [
        '$scope',
        '$uibModalInstance',
        '$resource',
        'WizioConfig',
        'modalData',
        'ModalBuilderFct',
        function ($scope, $uibModalInstance, $resource, WizioConfig, modalData, ModalBuilderFct) {
            $scope.submit = function(){
                var apiResource = $resource(WizioConfig.baseAPIURL + 'activelisting/:activelistingid/:tourpin', {
                    activelistingid: '@activelistingid',
                    tourpin: '@tourpin',
                });
                var query = {
                    activelistingid: modalData.activelistingid,
                    tourpin: $scope.virtualtourpin,
                };
                apiResource.query(query, function(response){
                    if(response[0].message){
                        ModalBuilderFct.buildSimpleModal(
                            "",
                            "OK",
                            "Error",
                            'Please try placing the pin again.'
                        ).then(function(result) {
                            return;
                        });
                    } else if (response.length > 0) {
                        $uibModalInstance.close(response);
                    }
                });
            }
        }
    ])

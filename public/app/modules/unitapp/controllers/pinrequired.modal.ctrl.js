angular.module("UnitApp")
    .controller('PinRequiredModalCtrl', [
        '$scope',
        '$uibModalInstance',
        '$resource',
        'WizioConfig',
        'modalData',
        function ($scope, $uibModalInstance, $resource, WizioConfig, modalData) {
            $scope.submit = function(){
                var apiResource = $resource(WizioConfig.baseAPIURL + 'activelisting/:activelistingid/:tourpin', {
                    activelistingid: '@activelistingid',
                    tourpin: '@tourpin',
                });
                var query = {
                    activelistingid: modalData.activelistingid,
                    tourpin: $scope.virtualtourpin,
                };
                console.dir('hi');
                console.dir($scope.virtualtourpin);
                apiResource.query(query, function(response){
                    if(response[0].message){
                        alert('Pin incorrect, please try again');
                    } else if (response.length > 0) {
                        $uibModalInstance.close(response);
                    }
                });
            }
        }
    ])

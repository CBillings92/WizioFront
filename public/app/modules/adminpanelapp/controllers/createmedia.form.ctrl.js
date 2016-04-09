angular.module('AdminPanelApp')
    .controller('CreateMediaFormCtrl', [
        '$scope',
        '$uibModalInstance',
        '$resource',
        'modalData',
        'WizioConfig',
        function($scope, $uibModalInstance, $resource, modalData, WizioConfig){
            $scope.apartment = modalData.apartment;
            $scope.mediaArray = [];

            function createMediaObj(){
                $scope.mediaArray.push({
                    UserId: 1,
                    ApartmentId: $scope.apartment.id
                });
                return;
            }
            function deleteMediaObj(index){
                $scope.mediaArray.splice(index, 1);
                return;
            }
            function sendMedia(){
                $resource(WizioConfig.baseAPIURL + 'admin/media')
                    .save($scope.mediaArray, function(response){
                        $uibModalInstance.close(response);
                    });
            }
            $scope.closeModal = function(){
                $uibModalInstance.dismiss();
            };
            $scope.fun = {
                createMediaObj: createMediaObj,
                deleteMediaObj: deleteMediaObj,
                sendMedia: sendMedia
            };
        }
    ]);

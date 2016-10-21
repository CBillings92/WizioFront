angular.module('PhotographerApp')
    .controller('UploadPhotoModalCtrl', [
        '$scope',
        'ModalSvc',
        '$uibModalInstance',
        'modalData',
        function($scope, ModalSvc, $uibModalInstance, modalData) {
            $scope.disabled = false;
            $scope.photoTitle = null;
            $scope.pin = modalData;
            $scope.ok = function(){
                return $uibModalInstance.close('ok');
            }
        }
    ])

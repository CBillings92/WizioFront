angular.module('TourPasswordApp')
    .controller('TourPasswordConfirmModalCtrl', [
        '$scope',
        '$uibModalInstance',
        'modalData',
        function ($scope, $uibModalInstance, modalData) {
            $scope.modalData = modalData;
            console.dir(modalData);
            $scope.windowLocationOrigin = window.location.origin;
            $scope.tourpassword = modalData.tourPassword.password;
            $scope.cancel = function(){
                $uibModalInstance.exit('canceled');
            }
            $scope.ok = function(){
                $uibModalInstance.close('ok');
            }
        }
    ])

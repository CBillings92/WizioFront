angular.module('TourPasswordApp')
    .controller('TourPasswordConfirmModalCtrl', [
        '$scope',
        '$uibModalInstance',
        'modalData',
        function ($scope, $uibModalInstance, modalData) {
            $scope.tourpassword = modalData.password;
            $scope.cancel = function(){
                $uibModalInstance.exit('canceled');
            }
            $scope.ok = function(){
                $uibModalInstance.close('ok');
            }
        }
    ])

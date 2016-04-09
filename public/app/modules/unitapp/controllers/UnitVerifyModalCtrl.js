angular.module('UnitApp')
.controller('UnitVerifyModalCtrl', [
    '$scope',
    '$uibModalInstance',
    'modalData',
    function($scope, $uibModalInstance, modalData){
        $scope.apartment = modalData;
        $scope.closeModal = function(){
            $uibModalInstance.dismiss();
        };
        $scope.dontUseData = function(){
            $uibModalInstance.close('Do not use data');
        };
        $scope.useData = function(){
            $uibModalInstance.close('Use data');
        };
    }
]);

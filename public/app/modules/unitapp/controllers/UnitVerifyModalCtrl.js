angular.module('UnitApp')
.controller('UnitVerifyModalCtrl', [
    '$scope',
    '$modalInstance',
    'modalData',
    function($scope, $modalInstance, modalData){
        $scope.apartment = modalData;

        $scope.dontUseData = function(){
            $modalInstance.close('Do not use data');
        };
        $scope.useData = function(){
            $modalInstance.close('Use data');
        };
    }
]);

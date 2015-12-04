angular.module('UnitApp')
.controller('UnitClaimSearchCtrl', [
    '$scope',
    '$modalInstance',
    'modalOptions',
    function($scope, $modalInstance, modalOptions){
        $scope.modalOptions = modalOptions;
    }
]);

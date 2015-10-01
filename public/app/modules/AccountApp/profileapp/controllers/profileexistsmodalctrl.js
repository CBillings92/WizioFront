angular.module('SellerApp')
.controller('ProfileExistsModalCtrl', [
    '$scope',
    '$modalInstance',
    '$state',
    'ProfileResource',
    'AuthFct',
    'FlexGetSetSvc',
    function($scope, $modalInstance, $state, ProfileResource, AuthFct, FlexGetSetSvc){
        $scope.ok = function() {
            $modalInstance.close('ok');
        };
        $scope.edit = function() {
            $modalInstance.close('edit');
        };
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }
]);

angular.module('buyerApp')
.controller('ProfileSaveModalCtrl', [
    '$scope',
    '$modalInstance',
    '$state',
    'apartment',
    function($scope, $modalInstance, $state, apartment){
        $scope.apartment = apartment;
        $scope.ok = function(){
            $modalInstance.close("saveAndApply");
        };
        $scope.save = function(){
            $modalInstance.close("save");
        };
        $scope.cancel = function(){
            $modalInstance.dismiss('cancel');
        };
    }
]);

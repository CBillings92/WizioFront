angular.module('ApplicationApp')
.controller('ContactRepFormCtrl', [
    '$scope',
    '$modalInstance',
    function($scope, $modalInstance) {    
        $scope.closeModal = function(){
            $modalInstance.dismiss();
        };
    }
]);

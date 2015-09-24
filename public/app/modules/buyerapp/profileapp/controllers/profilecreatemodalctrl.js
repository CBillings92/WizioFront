angular.module('BuyerApp')
    .controller('ProfileCreateModalCtrl', [
        '$scope',
        '$modalInstance',
        '$state',
        function($scope, $modalInstance, $state) {
            $scope.ok = function() {
                $modalInstance.close('ok');
                
            };

            $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
            };
        }
    ]);

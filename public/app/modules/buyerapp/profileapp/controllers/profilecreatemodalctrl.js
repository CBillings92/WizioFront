angular.module('buyerApp')
    .controller('ProfileCreateModalCtrl', [
        '$scope',
        '$modalInstance',
        '$state',
        function($scope, $modalInstance, $state) {
            $scope.ok = function() {
                $modalInstance.close();
                $state.go('CreateProfile');
            };

            $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
            };
        }
    ]);

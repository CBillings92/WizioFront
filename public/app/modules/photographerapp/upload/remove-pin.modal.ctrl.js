angular.module('PhotographerApp')
    .controller('RemovePinModalCtrl', [
        '$scope',
        'modalData',
        '$uibModalInstance',
        function ($scope, modalData, $uibModalInstance) {
            $scope.buttonClick = function(action){
                return $uibModalInstance.close(action);
            };
        }
    ]);

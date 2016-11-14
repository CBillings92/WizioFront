angular.module('PhotographerApp')
    .controller('RemovePinModalCtrl', [
        '$scope',
        'modalData',
        '$uibModalInstance',
        function ($scope, modalData, $uibModalInstance) {
            $scope.ok = function(){
                return $uibModalInstance.close('ok');
            };
            $scope.notok = function(){
                return $uibModalInstance.close('notok');
            };
        }
    ]);

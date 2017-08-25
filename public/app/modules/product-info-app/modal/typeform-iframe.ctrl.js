angular.module('ProductInfoApp')
    .controller('ProductInfoModalCtrl', [
        '$scope',
        '$uibModalInstance',
        'modalData',
        '$sce',
        function($scope, $uibModalInstance, modalData, $sce) {


            console.log(modalData);
            $scope.url = $sce.trustAsResourceUrl(modalData);
            console.log($scope.url);

            $scope.ok = function() {
                $uibModalInstance.close('success');
            };

            $scope.closeModal = function(){
                $uibModalInstance.dismiss();
            };

    }]);

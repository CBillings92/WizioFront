angular.module('ProductInfoApp')
    .controller('ProductInfoModalCtrl', [
        '$scope',
        '$uibModalInstance',
        'modalData',
        '$sce',
        function($scope, $uibModalInstance, modalData, $sce) {

            //angular isn't happy showing the iframe unless you "trust" the url
            $scope.url = $sce.trustAsResourceUrl(modalData);

            $scope.ok = function() {
                $uibModalInstance.close('success');
            };

            $scope.closeModal = function(){
                $uibModalInstance.dismiss();
            };

    }]);

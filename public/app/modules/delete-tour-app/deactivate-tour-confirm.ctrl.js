angular.module('DeleteTourApp')
    .controller('DeactivateTourConfirmCtrl', [
        '$scope',
        '$uibModalInstance',
        'DeleteTourModalFct',
        'modalData',
        function($scope, $uibModalInstance, DeleteTourModalFct, modalData) {
            $scope.closeModal = function () {
                $uibModalInstance.close();
            };
            $scope.modalAction = function (action) {
                if(action === 'deactivate') {
                    DeleteTourModalFct.deactivateTour(modalData.activeListing.pubid)
                    .then(function(results){
                        $uibModalInstance.close();
                    });
                } else {
                    $uibModalInstance.close();
                }
            };

        }
    ]);

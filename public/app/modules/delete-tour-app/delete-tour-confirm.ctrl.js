angular.module('DeleteTourApp')
    .controller('DeleteTourConfirmCtrl', [
        '$scope',
        '$uibModalInstance',
        'DeleteTourModalFct',
        'modalData',
        function($scope, $uibModalInstance, DeleteTourModalFct, modalData) {
            $scope.closeModal = function () {
                $uibModalInstance.close();
            }

            $scope.modalAction = function (action) {
                if(action === 'delete') {
                    DeleteTourModalFct.deleteTour(modalData.activeListing.pubid)
                    .then(function(results){
                        $uibModalInstance.close();
                    })
                } else {
                    $uibModalInstance.close();
                }
            }

        }
    ])

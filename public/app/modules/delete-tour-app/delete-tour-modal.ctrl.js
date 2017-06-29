angular.module('DeleteTourApp')
    .controller('DeleteTourModalCtrl', [
        '$scope',
        'modalData',
        '$uibModalInstance',
        'LoadingSpinnerFct',
        'DeleteTourModalFct',
        function($scope, modalData, $uibModalInstance, LoadingSpinnerFct, DeleteTourModalFct){
            // Close modal with 'x' on top right of modal - a directive
            $scope.closeModal = function () {
                $uibModalInstance.close();
            };

            $scope.modalAction = function(action) {
                if(action === 'delete') {
                    $uibModalInstance.close('delete');
                } else if (action === 'deactivate') {
                    $uibModalInstance.close('deactivate')
                } else {
                    $uibModalInstance.close('cancel');
                }
            }

            function deleteTour () {

            }


        }
    ])

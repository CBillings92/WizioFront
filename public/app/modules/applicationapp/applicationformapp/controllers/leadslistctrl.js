angular.module('ApplicationApp')
    .controller('LeadsListCtrl', [
        '$scope',
        'TimeFormatterSvc',
        'modalData',
        '$uibModalInstance',
        function($scope, TimeFormatterSvc, modalData, $uibModalInstance){
            $scope.addr = modalData[1];
            for (var i = 0; i < modalData[0].length; i++) {
                var formattedMoveInDate = TimeFormatterSvc.formatTimeFlex(modalData[0][i].moveInDate, 'MMMM DD, YYYY');
                modalData[0][i].moveInDate = formattedMoveInDate;

            }
            $scope.leads = modalData[0];
            $scope.unitNum = modalData[2];
            $scope.closeModal = function(){
                $uibModalInstance.close();
            };
        }
    ]);

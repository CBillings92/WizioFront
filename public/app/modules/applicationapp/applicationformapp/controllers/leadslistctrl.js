angular.module('ApplicationApp')
    .controller('LeadsListCtrl', [
        '$scope',
        'TimeFormatterSvc',
        'modalData',
        '$modalInstance',
        function($scope, TimeFormatterSvc, modalData, $modalInstance){
            $scope.addr = modalData[1];
            var formattedMoveInDate = TimeFormatterSvc.formatTimeFlex(modalData[0].moveInDate, 'MMMM DD, YYYY');
            modalData[0][0].moveInDate = formattedMoveInDate;
            $scope.leads = modalData[0];
            $scope.unitNum = modalData[2];
            $scope.closeModal = function(){
                $modalInstance.close();
            };
        }
    ]);

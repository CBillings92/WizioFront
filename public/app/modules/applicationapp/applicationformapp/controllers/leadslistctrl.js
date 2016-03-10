angular.module('ApplicationApp')
    .controller('LeadsListCtrl', [
        '$scope',
        'TimeFormatterSvc',
        'modalData',
        function($scope, TimeFormatterSvc, modalData){
            console.dir(modalData[1]);
            $scope.addr = modalData[1];
            var formattedMoveInDate = TimeFormatterSvc.formatTimeFlex(modalData[0].moveInDate, 'MMMM-DD-YYYY');
            modalData[0].moveInDate = formattedMoveInDate;
            console.dir(modalData);
            $scope.leads = modalData[0];
            $scope.unitNum = modalData[2];

        }
    ]);

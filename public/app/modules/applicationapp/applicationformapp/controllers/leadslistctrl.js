angular.module('ApplicationApp')
    .controller('LeadsListCtrl', [
        '$scope',
        'TimeFormatterSvc',
        'modalData',
        function($scope, TimeFormatterSvc, modalData){
            console.dir();
            var formattedMoveInDate = TimeFormatterSvc.formatTimeFlex(modalData.moveInDate, 'MMMM-DD-YYYY');
            modalData[0].moveInDate = formattedMoveInDate;
            console.dir(modalData);
            $scope.leads = modalData;

        }
    ]);

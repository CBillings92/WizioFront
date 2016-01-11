angular.module('ApplicationApp')
.controller('ApplicationDetailCtrl', [
    '$scope',
    'FlexGetSetSvc',
    function($scope, FlexGetSetSvc){
        $scope.applicationDetails = FlexGetSetSvc.get('ApplicationDetails', 'ApplicationDetails');

    }
]);

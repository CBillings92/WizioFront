angular.module('UnitApp')
.controller('UnitClaimFormCtrl', [
    '$scope',
    'SmartSearchSvc',
    function($scope, SmartSearchSvc){
        $scope.getLocation = function(val){
            return SmartSearchSvc.smartSearch(val);
        };
    }
]);

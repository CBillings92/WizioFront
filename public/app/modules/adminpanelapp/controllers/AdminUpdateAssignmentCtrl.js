angular.module('AdminPanelApp')
.controller('AdminUpdateAssignmentCtrl', [
    '$scope',
    'AdminPanelResource',
    function($scope, AdminPanelResource){
        $scope.data = {};
        $scope.submitEdits = function() {
            AdminPanelResource.save({item: 'assignment', action: 'update'}, $scope.data, function(status, data){
            });
        };
    }
]);

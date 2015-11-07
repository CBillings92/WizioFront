angular.module('AdminPanelApp')
.controller('AdminUpdateAssignmentCtrl', [
    '$scope',
    'AdminPanelResource',
    function($scope, AdminPanelResource){
        $scope.data = {};
        $scope.submitEdits = function() {
            console.dir($scope.data);
            AdminPanelResource.save({item: 'assignment', action: 'update'}, $scope.data, function(status, data){
            })
        }
    }
])

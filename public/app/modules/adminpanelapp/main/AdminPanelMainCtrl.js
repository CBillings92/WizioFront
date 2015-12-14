angular.module('AdminPanelApp')
.controller('AdminPanelMainCtrl', [
    '$scope',
    function ($scope) {
        $scope.$on('passToSiblingAdminApp', function(event, data){
                $scope.$broadcast(data.name, data.data);
        });
    }
]);

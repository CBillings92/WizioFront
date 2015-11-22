angular.module('AccountApp')
.controller('AccountTypeModalCtrl', [
    '$scope',
    '$modalInstance',
    function($scope, $modalInstance){
        var modal = function(templateUrl, controller, size) {
            var modalInstance = $modal.open({
                templateUrl: templateUrl,
                controller: controller,
                size: size
            });
            return modalInstance;
        };
        $scope.tenantSignup = function(){
            $modalInstance.close('tenantSignup');
        };
        $scope.landlordSignup = function(){
            $modalInstance.close('landlordSignup');
        };
    }
]);

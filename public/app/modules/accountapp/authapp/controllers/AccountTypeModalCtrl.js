/*
    for the signup modal - account type selection screen
*/
angular.module('AccountApp')
.controller('AccountTypeModalCtrl', [
    '$scope',
    '$uibModalInstance',
    function($scope, $uibModalInstance){
        $scope.closeModal = function() {
            $uibModalInstance.close();
        };
        //get accountType from the form
        $scope.nextStep = function(accountType) {
            //account type tenant? TenantSignup, otherwise propertyManagerSignup
            //FIXME - will need functionality for brokerages.
            var chosenAccountType = (accountType == 'tenant') ? 'tenantSignup' : 'propertyManagerSignup';
            $uibModalInstance.close(chosenAccountType);
        };
    }
]);

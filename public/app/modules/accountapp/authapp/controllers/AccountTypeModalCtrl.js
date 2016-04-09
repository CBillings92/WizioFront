/*
    for the signup modal - account type selection
*/
angular.module('AccountApp')
.controller('AccountTypeModalCtrl', [
    '$scope',
    '$modalInstance',
    function($scope, $modalInstance){
        $scope.closeModal = function() {
            $modalInstance.close();
        };
        //get accountType from the form
        $scope.nextStep = function(accountType) {
            var chosenAccountType = (accountType == 'tenant') ? 'tenantSignup' : 'propertyManagerSignup';
            $modalInstance.close(chosenAccountType);
        };
    }
]);

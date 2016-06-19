/*
    for the signup modal - account type selection
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
            var chosenAccountType = (accountType == 'tenant') ? 'tenantSignup' : 'propertyManagerSignup';
            console.dir(chosenAccountType);
            console.dir(accountType);
            $uibModalInstance.close(chosenAccountType);
        };
    }
]);

angular.module('AccountApp')
.controller('AddTenantsToLeaseCtrl', [
    '$scope',
    '$modalInstance',
    'modalData',
    'LeaseModel',
    function($scope, modalInstance, modalData, LeaseModel){
        $scope.inputNames = [{
            labelName: 'First Name:',
            variable: 'firstName',
        }, {
            labelName: 'Last Name:',
            variable: 'lastName'
        }, {
            labelName: 'Email:',
            vairable: 'email'
        }];
        $scope.lease = [];
        for(var i = 0; i < modalData.Apartment.maxResidency; i++){
            $scope.lease.push({});
        }
        $scope.addTenantsToLease = function(){
            console.dir($scope.lease);
            // LeaseModal.api.base().save($scope.lease, function(response){
            //
            // });
        };
    }
]);

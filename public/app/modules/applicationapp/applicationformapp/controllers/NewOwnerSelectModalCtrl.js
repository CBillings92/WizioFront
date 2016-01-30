angular.module('ApplicationApp')
.controller('NewOwnerSelectModalCtrl', [
    '$scope',
    '$modalInstance',
    'modalData',
    function($scope, $modalInstance, modalData){
        console.dir(modalData);
        $scope.applications = modalData;
        $scope.selectNewOwner = function(userIndex){
            var applicant = new Applicant($scope.applications[userIndex]);

            applicant.API.setOwner(function(response){
                $modalInstance.close();
            });
        };
        $scope.cancel = function(){
            $modalInstance.dismiss();
        };
    }
]);

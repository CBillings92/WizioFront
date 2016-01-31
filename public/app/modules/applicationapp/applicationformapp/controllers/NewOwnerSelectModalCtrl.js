angular.module('ApplicationApp')
.controller('NewOwnerSelectModalCtrl', [
    '$scope',
    '$modalInstance',
    'modalData',
    'ApplicantModel',
    function($scope, $modalInstance, modalData, ApplicantModel){
        console.dir(modalData);
        $scope.applications = modalData;
        $scope.selectNewOwner = function(userIndex){
            console.dir($scope.applications[userIndex]);
            var applicant = ApplicantModel.build($scope.applications[userIndex]);
            console.dir(applicant);
            applicant.setOwner(function(response){
                $modalInstance.close();
            });
        };
        $scope.cancel = function(){
            $modalInstance.dismiss();
        };
    }
]);

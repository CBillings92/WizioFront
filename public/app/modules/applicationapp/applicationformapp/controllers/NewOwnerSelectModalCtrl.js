angular.module('ApplicationApp')
.controller('NewOwnerSelectModalCtrl', [
    '$scope',
    '$uibModalInstance',
    'TokenSvc',
    'modalData',
    'ApplicantModel',
    'ApplicationResource',
    function($scope, $uibModalInstance, TokenSvc, modalData, ApplicantModel, ApplicationResource){
        $scope.applications = modalData;
        $scope.selectNewOwner = function(userIndex){
            var applicant = ApplicantModel.build($scope.applications[userIndex]);
            if(modalData.removeCurrentUser){
                applicant.removeCurrentUser = true;
            }
            applicant.setOwner(function(response){
                if(applicant.removeCurrentUser){
                    var currentUser = {
                        UserId: TokenSvc.decode().id,
                        ApartmentId: applicant.ApartmentId,
                        ApplicationId: applicant.ApplicationId,
                        concatAddr: $scope.applications[userIndex].Apartment.concatAddr
                    };
                    ApplicationResource.flex.save({
                        item: 'user',
                        action: 'remove'
                    }, currentUser, function(data, status) {
                        $uibModalInstance.close();
                    });
                } else {
                    $uibModalInstance.close();
                }
            });
        };
        $scope.cancel = function(){
            $uibModalInstance.dismiss();
        };
    }
]);

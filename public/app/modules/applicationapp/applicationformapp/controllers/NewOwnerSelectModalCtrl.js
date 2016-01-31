angular.module('ApplicationApp')
.controller('NewOwnerSelectModalCtrl', [
    '$scope',
    '$modalInstance',
    'TokenSvc',
    'modalData',
    'ApplicantModel',
    'ApplicationResource',
    function($scope, $modalInstance, TokenSvc, modalData, ApplicantModel, ApplicationResource){
        $scope.applications = modalData;
        $scope.selectNewOwner = function(userIndex){
            var applicant = ApplicantModel.build($scope.applications[userIndex]);
            if(modalData.removeCurrentUser){
                applicant.removeCurrentUser = true;
            }
            console.dir(applicant);
            applicant.setOwner(function(response){
                var currentUser = {
                    UserId: TokenSvc.decode().id,
                    ApartmentId: applicant.ApartmentId,
                    ApplicationId: applicant.ApplicationId,
                    concatAddr: $scope.applications[userIndex].Apartment.concatAddr
                }
                ApplicationResource.flex.save({
                    item: 'user',
                    action: 'remove'
                }, currentUser, function(data, status) {
                    console.dir(data);
                    alert("Removed from application");
                });
            });
        };
        $scope.cancel = function(){
            $modalInstance.dismiss();
        };
    }
]);

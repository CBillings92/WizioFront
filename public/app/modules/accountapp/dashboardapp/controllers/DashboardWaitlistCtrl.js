angular.module('AccountApp')
.controller('DashboardWaitlistCtrl', [
    '$scope',
    'ApplicationResource',
    'TokenSvc',
    'lodash',
    function($scope, ApplicationResource, TokenSvc, lodash){
        var user = TokenSvc.decode();
        var applicationIdArray = lodash.pluck(user.waitlists, "ApplicationId");
        applicationIdObject = {
            ApplicationId: applicationIdArray,
            //UserId: user.id
        };
        ApplicationResource.save({item: 'findbyuser'}, applicationIdObject, function(data, status){

            var buildingWaitlists = lodash.groupBy(data, "ApplicationId");
            $scope.waitlists = lodash.values(buildingWaitlists);
            for(var i=0; i < $scope.waitlists.length; i++){
                console.dir($scope.waitlists[i][0].Apartment);
                $scope.waitlists[i][0].Apartment.pets = "Dogs and Cats";
                $scope.waitlists[i][0].Apartment.utilities = "Hot Water";
            }
            if($scope.waitlists.length > 0){
                $scope.waitlistsExist = true;
            }
        });
        $scope.removeFromWaitlist = function(value){
            var dataPasser = {
                ApplicationId: $scope.waitlists[value][0].ApplicationId,
                UserId: user.id
            };
            ApplicationResource.save({item: 'user', action: 'remove'}, dataPasser, function(data, status){
                $scope.waitlists.splice(value);
                alert("DONE!");
            });
        };
    }
]);

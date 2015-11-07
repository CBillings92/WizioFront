angular.module('AccountApp')
.controller('DashboardWaitlistCtrl', [
    '$scope',
    'ApplicationResource',
    'TokenSvc',
    'lodash',
    function($scope, ApplicationResource, TokenSvc, lodash){
        var user = TokenSvc.decode();
        console.dir(user);
        var applicationIdArray = lodash.pluck(user.waitlists, "ApplicationId");
        applicationIdObject = {
            ApplicationId: applicationIdArray,
            UserId: user.id
        };
        ApplicationResource.save({item: 'findbyuser'}, applicationIdObject, function(data, status){
            var buildingWaitlists = lodash.groupBy(data, "ApplicationId");
            $scope.waitlists = lodash.values(buildingWaitlists);
            if($scope.waitlists.length > 0){
                $scope.waitlistsExist = true;
            }
            console.dir($scope.waitlists);
        });
        $scope.removeFromWaitlist = function(value){
            var dataPasser = {
                ApplicationId: $scope.waitlists[value][0].ApplicationId,
                UserId: user.id
            };
            console.dir(dataPasser);
            ApplicationResource.save({item: 'user', action: 'remove'}, dataPasser, function(data, status){
                $scope.waitlists.splice(value);
                alert("DONE!");
            });
        };
    }
]);

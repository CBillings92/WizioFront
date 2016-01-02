angular.module('AccountApp')
.controller('DashboardApplicationCtrl', [
    '$scope',
    'ApplicationResource',
    'TokenSvc',
    'lodash',
    function($scope, ApplicationResource, TokenSvc, lodash){
        var user = TokenSvc.decode();
        var applicationIdArray = lodash.pluck(user.applications, "id");
        applicationIdObject = {
            ApplicationId: applicationIdArray,
            //UserId: user.id
        };
        ApplicationResource.save({item: 'findbyuser'}, applicationIdObject, function(data, status){
            if(data.length !== 0){
                var buildingApplications = lodash.groupBy(data, "ApplicationId");
                $scope.applications = lodash.values(buildingApplications);
                if($scope.applications.length > 0){
                    $scope.applicationsExist = true;
                }
            } else {
                $scope.applicationsExist = false;
            }
        });
        $scope.removeFromApplication = function(value){
            var dataPasser = {
                ApplicationId: $scope.applicaitons[value][0].ApplicationId,
                UserId: user.id
            };
            ApplicationResource.save({item: 'user', action: 'remove'}, dataPasser, function(data, status){
                $scope.applications.splice(value);
                alert("DONE!");
            });
        };
    }
]);

angular.module('AccountApp')
.controller('DashboardApplicationCtrl', [
    '$scope',
    'ApplicationResource',
    'TokenSvc',
    'lodash',
    function($scope, ApplicationResource, TokenSvc, lodash){
        var user = TokenSvc.decode();
        console.dir(user);
        var applicationIdArray = lodash.pluck(user.applications, "ApplicationId");
        ApplicationResource.findByAppIds.save(applicationIdArray, function(data, status){
            console.dir(data);
            if(data.length !== 0){
                var buildingApplications = lodash.groupBy(data, "ApplicationId");
                console.dir(buildingApplications);
                $scope.applications = lodash.values(buildingApplications);
                console.dir($scope.applications);
                if($scope.applications.length > 0){
                    $scope.applicationsExist = true;
                }
            } else {
                $scope.applicationsExist = false;
            }
        });
        $scope.removeFromApplication = function(value){
            var dataPasser = {
                ApplicationId: $scope.applications[value][0].ApplicationId,
                UserId: user.id
            };
            ApplicationResource.flex.save({item: 'user', action: 'remove'}, dataPasser, function(data, status){
                $scope.applications.splice(value);
                alert("DONE!");
            });
        };
    }
]);

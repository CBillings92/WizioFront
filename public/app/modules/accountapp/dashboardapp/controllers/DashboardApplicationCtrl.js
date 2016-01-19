angular.module('AccountApp')
    .controller('DashboardApplicationCtrl', [
        '$scope',
        'ApplicationResource',
        'TokenSvc',
        'lodash',
        function($scope, ApplicationResource, TokenSvc, lodash) {
            //get user object from token
            var user = TokenSvc.decode();
            //get all ApplicationIds on the user object
            var applicationIdArray = lodash.pluck(user.applications, "ApplicationId");
            //call api and send applicationIds to retrieve applictions for display
            ApplicationResource.findByAppIds.save(applicationIdArray, function(data, status) {
                //if applicaitons were found
                if (data.length !== 0) {
                    //grop the applications by ApplicationId
                    var buildingApplications = lodash.groupBy(data, "ApplicationId");
                    $scope.applications = lodash.values(buildingApplications);
                    if ($scope.applications.length > 0) {
                        $scope.applicationsExist = true;
                    }
                } else {
                    $scope.applicationsExist = false;
                }
            });
            $scope.removeFromApplication = function(value) {
                var dataPasser = {
                    ApplicationId: $scope.applications[value][0].ApplicationId,
                    UserId: user.id
                };
                ApplicationResource.flex.save({
                    item: 'user',
                    action: 'remove'
                }, dataPasser, function(data, status) {
                    $scope.applications.splice(value);
                    alert("Removed from application");
                });
            };
        }
    ]);

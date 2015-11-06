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
            ApplicationId: applicationIdArray
        };
        ApplicationResource.save({item: 'findbyuser'}, applicationIdObject, function(data, status){
            $scope.waitlists = data;
            console.dir(data);
            $scope.waitlistEmails = lodash.pluck(data, "ContactEmail");
            console.dir($scope.waitlistEmails);
            var uniqueAppIds = lodash.uniq(lodash.pluck(data,"ApplicationId"));
            console.dir(uniqueAppIds);
            $scope.trial = lodash.groupBy(data, "ApplicationId");
            console.dir($scope.trial);
            $scope.trial2 = lodash.values($scope.trial);
            console.dir($scope.trial2);
            for(i = 0; i< $scope.trial2.length; i++){
                $scope.trial2[i].push(lodash.pluck($scope.trial2[i].User, "email"));
                console.dir($scope.trial2);
            }
            console.dir($scope.trial2[0]);
            $scope.trial3 = $scope.trial2[0];

        });
    }
]);

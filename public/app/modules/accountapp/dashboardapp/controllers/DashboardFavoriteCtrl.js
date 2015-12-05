angular.module('AccountApp')
.controller('DashboardFavoriteCtrl', [
    '$scope',
    'ApplicationResource',
    'TokenSvc',
    'lodash',
    function($scope, ApplicationResource, TokenSvc, lodash){
        var user = TokenSvc.decode();
        var applicationIdArray = lodash.pluck(user.favorites, "ApplicationId");
        applicationIdObject = {
            ApplicationId: applicationIdArray,
            //UserId: user.id
        };
        ApplicationResource.save({item: 'findbyuser'}, applicationIdObject, function(data, status){
            var buildingfavorites = lodash.groupBy(data, "ApplicationId");
            $scope.favorites = lodash.values(buildingWaitlists);
            if($scope.favorites.length > 0){
                $scope.favoritesExist = true;
            }
        });
        $scope.removeFromFavorite = function(value){
            var dataPasser = {
                ApplicationId: $scope.favorites[value][0].ApplicationId,
                UserId: user.id
            };
            ApplicationResource.save({item: 'user', action: 'remove'}, dataPasser, function(data, status){
                $scope.favorites.splice(value);
                alert("DONE!");
            });
        };
    }
]);

angular.module('AccountApp')
.controller('DashboardFavoriteCtrl', [
    '$scope',
    'FavoriteModel',
    'TokenSvc',
    'lodash',
    function($scope, FavoriteModel, TokenSvc, lodash){
        var user = TokenSvc.decode();
        var dataPasser = {
            ApartmentIdArray: user.favorites,
            UserId: user.id
        };
        $scope.favoritesExist = false;
        if(user.favorites.length !== 0){
            FavoriteModel.findByUser().save(dataPasser, function(result){
                if(result.lenght !== 0){
                    $scope.favorites = result;
                    $scope.favoritesExist = true;
                }
                console.dir(result);
            });
        }
        $scope.removeFromFavorite = function(value){
            var favorite = new FavoriteModel(user.id, $scope.favorites[value].ApartmentId);
            FavoriteModel.api().delete(favorite, function(data, status){
                $scope.favorites.splice(value);
                alert("DONE!");
            });
        };
    }
]);

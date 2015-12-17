angular.module('ApplicationApp')
.controller('FavoriteCreateModalCtrl', [
    '$scope',
    '$modalInstance',
    'FlexGetSetSvc',
    'TokenSvc',
    'ApplicationResource',
    function($scope, $modalInstance, FlexGetSetSvc, TokenSvc, ApplicationResource){

        $scope.apartment = FlexGetSetSvc.get('ApartmentFavoritingTo');
        var requestInfoOutbound = {
           apartmentInfo: null,
           users: null,
           owner: null
           };
        $scope.favoriteArray = [];
        $scope.trial = [];



        $scope.waitlistSignup = function() {
            var apartmentObj = {
                apartmentId: $scope.apartment.id,
            };
            requestInfoOutbound.apartmentInfo = apartmentObj;
            requestInfoOutbound.users = $scope.favoritesArray;
            ApplicationResource.save(requestInfoOutbound, function(result, status){
                $modalInstance.close('ok');
            });

        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }
]);

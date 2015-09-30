angular.module('SellerApp')
.controller('ProfileExistsModalCtrl', [
    '$scope',
    '$modalInstance',
    '$state',
    'ProfileResource',
    'AuthFct',
    'FlexGetSetSvc',
    function($scope, $modalInstance, $state, ProfileResource, AuthFct, FlexGetSetSvc){
        var user = AuthFct.getTokenClaims();
        ProfileResource.get({id: user.ProfileId}, function(data){
            $scope.profile = data;
        });

        $scope.ok = function() {
            $modalInstance.close('ok');
        };
        $scope.edit = function() {
            FlexGetSetSvc.set(data);
            $modalInstance.close(data);
        };
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }
]);

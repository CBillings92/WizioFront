angular.module('SellerApp')
.controller('ProfileExistsModalCtrl', [
    '$scope',
    '$modalInstance',
    '$state',
    'ProfileResource',
    'AuthFct',
    function($scope, $modalInstance, $state, ProfileResource, AuthFct){
        var user = AuthFct.getTokenClaims();
        ProfileResource.get({id: user.ProfileId}, function(data){
            $scope.profile = data;
        });
        
        $scope.ok = function() {
            $modalInstance.close('ok');
        };
        $scope.edit = function() {
            $modalInstance.close('edit');
        };
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }
]);

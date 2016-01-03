angular.module('AccountApp')
    .controller('DashboardControlsCtrl', [
        '$scope',
        '$state',
        'TokenSvc',
        'FlexGetSetSvc',
        'ProfileModel',
        function($scope, $state, TokenSvc, FlexGetSetSvc, ProfileModel) {
            $scope.accountInfo = TokenSvc.decode();

            $scope.viewProfile = function() {
                console.dir($scope.accountInfo);
                if ($scope.accountInfo.ProfileId) {
                    ProfileModel.api().get({
                        id: $scope.accountInfo.ProfileId
                    }, function(response){
                        if(response){
                            //arguments are data, sessionStorage variable name,
                            //key for objectStore. See sharedServices getSet
                            FlexGetSetSvc.set(response, null, 'ExtendedProfile');
                            $state.go('Account.Profile.Edit');
                        } else {
                            $state.go('Account.Profile.Create');
                        }
                    })
                } else {
                    $state.go('Account.Profile.Create');
                }

            }
        }
    ])

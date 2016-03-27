angular.module('AccountApp')
    .controller('DashboardControlsCtrl', [
        '$scope',
        '$state',
        'TokenSvc',
        'FlexGetSetSvc',
        'ProfileModel',
        function($scope, $state, TokenSvc, FlexGetSetSvc, ProfileModel) {
            $scope.accountInfo = TokenSvc.decode();
            $scope.leaveFeedback = function leaveFeedback(){

            };
            $scope.viewProfile = function() {
                if ($scope.accountInfo.ProfileId) {
                    ProfileModel.api.oneParam.get({
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
                    });
                } else {
                    $state.go('Account.Profile.Create');
                }

            };

        }
    ]);

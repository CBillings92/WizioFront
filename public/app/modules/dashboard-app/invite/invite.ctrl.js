angular.module('DashboardApp')
    .controller('InviteCtrl', [
        '$scope',
        'InviteFct',
        '$state',
        function ($scope, InviteFct, $state) {
            $scope.inviteUser = function () {
                InviteFct.inviteUser($scope.emailOfInvitee)
                .then(function(response){

                });
            }
        }
    ])

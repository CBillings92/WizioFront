angular.module('DashboardApp')
    .controller('InviteCtrl', [
        '$scope',
        'InviteFct',
        '$state',
        function ($scope, InviteFct, $state) {
            InviteFct.inviteUser($scope.emailOfInvitee)
            .then(function(response){

            });
        }
    ])

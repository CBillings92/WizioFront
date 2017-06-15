angular.module('DashboardApp')
    .controller('InviteCtrl', [
        '$scope',
        'InviteFct',
        '$state',
        'LoadingSpinnerFct',
        function ($scope, InviteFct, $state, LoadingSpinnerFct) {
            $scope.SubmitButtonConfig = {
                text: 'Send Invite',
                disabled: false
            };
            $scope.inviteUser = function () {
                $scope.SubmitButtonConfig.text = 'Sending Invite...';
                $scope.SubmitButtonConfig.disabled = true;
                LoadingSpinnerFct.show('dashboard-invite-user-spinner');
                InviteFct.inviteUser($scope.emailOfInvitee)
                .then(function(response){
                    $scope.SubmitButtonConfig.text = 'Send Invite';
                    $scope.SubmitButtonConfig.disabled = false;
                    LoadingSpinnerFct.hide('dashboard-invite-user-spinner');
                });
            }
        }
    ])

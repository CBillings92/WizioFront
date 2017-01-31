angular.module('AccountApp')
    .controller('AccountCreationFormCtrl', [
        '$scope',
        '$state',
        'SubscriptionFct',
        function($scope, $state, SubscriptionFct) {
            //test
            $scope.signupInvite = $state.current.name === "Signup.Invite" ? true : false;

            $scope.submit = function() {

                if ($scope.user.password != $scope.user.passwordConfirm) {
                    alert("Passwords do not match!");
                    return;
                }

                var user = $scope.user;
                if($scope.signupInvite){
                    user.invitePubId = $state.params.invitePubId;
                } else {
                    var subscription = $scope.chosenSubscription;
                }
            //    user.accountType = 'local';

                SubscriptionFct.post.saveNewUser(user, subscription)
                    .then(function(response) {
                      $state.go('Account.Dashboard');
                    });
            };

        }
    ]);

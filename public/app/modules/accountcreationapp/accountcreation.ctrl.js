angular.module('AccountApp')
    .controller('AccountCreationFormCtrl', [
        '$scope',
        '$state',
        function($scope, $state) {
            //test
            $scope.signupInvite = $state.current.name === "Signup.Invite" ? true : false;

            $scope.submit = function() {
                if ($scope.password != $scope.passwordConfirm) {
                    alert("Passwords do not match!");
                    return;
                }

                var user = $scope.user;
                console.dir($state.params);
                if($scope.invitationSignup){
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

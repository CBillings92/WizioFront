angular.module('AccountApp')
    .controller('SubscriptionMainCtrl', [
        '$scope',
        '$state',
        'SubscriptionFct',
        function($scope, $state, SubscriptionFct) {
            $scope.invitationSignup = $state.current.name === 'Signup.Invite' ? true : false;
            $scope.submit = function() {
                var user = $scope.user;
                var subscription;
                console.dir($state.params);
                if($scope.invitationSignup){
                    user.invitePubId = $state.params.invitePubId
                } else {
                    user.subscription = $scope.chosenSubscription;
                }
                user.accountType = 'local';
                SubscriptionFct.post.saveNewUser(user)
                    .then(function(response) {
                      $state.go('Account.Dashboard');
                    });
            };
        }
    ]);

angular.module('AccountApp')
    .controller('SubscriptionMainCtrl', [
        '$scope',
        '$state',
        'SubscriptionFct',
        function($scope, $state, SubscriptionFct) {


            $scope.submit = function() {
                var user = $scope.user;
                user.accountType = 'local';
                var subscription = $scope.chosenSubscription;

                SubscriptionFct.post.saveNewUser(user, subscription)
                    .then(function(response) {
                        $state.go('Account.Dashboard');
                        console.log(response);
                    });
            };
        }
    ]);

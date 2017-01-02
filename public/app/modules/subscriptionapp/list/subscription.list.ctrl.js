angular.module('AccountApp')
    .controller('SubscriptionListCtrl', [
        '$scope',
        'SubscriptionFct',
        function($scope, SubscriptionFct) {
            // test
            SubscriptionFct.get.subscriptions()
            .then(function(response){
              $scope.subscriptions = response;
            });
            $scope.chooseSubscription = function chooseSubscription(subscription) {
                console.dir(subscription);
                $scope.chosenSubscription = subscription;
            };
    }]);

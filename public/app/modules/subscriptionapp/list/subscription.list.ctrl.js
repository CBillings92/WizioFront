angular.module('AccountApp')
    .controller('SubscriptionListCtrl', [
        '$scope',
        'SubscriptionFct',
        function($scope, SubscriptionFct) {
            // test
            $scope.subscriptions = SubscriptionFct.get.subscriptions();
            $scope.chooseSubscription = function chooseSubscription(subscription) {
                console.dir(subscription);
                $scope.chosenSubscription = subscription;
              }
    }])

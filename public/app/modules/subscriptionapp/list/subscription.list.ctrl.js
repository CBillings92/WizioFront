angular.module('AccountApp')
    .controller('SubscriptionListCtrl', [
        '$scope',
        'SubscriptionFct',
        function($scope, SubscriptionFct) {
            // test
            $scope.subscriptions = SubscriptionFct.get.subscriptions();
    }])

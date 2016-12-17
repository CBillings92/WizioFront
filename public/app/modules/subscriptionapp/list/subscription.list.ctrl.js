angular.module('AccountApp')
    .controller('SubscriptionListCtrl', [
        '$scope',
        'SubscriptionFct',
        function($scope, SubscriptionFct) {
            // test
            console.dir('Hello');
            console.dir(SubscriptionFct);
            $scope.subscriptions = SubscriptionFct.get.subscriptions();
            console.dir($scope.subscriptions);
    }])

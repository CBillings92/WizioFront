angular.module('AccountApp')
    .directive('subscriptionTileDir', [
        function() {
            return {
                templateUrl: 'public/app/modules/subscriptionapp/tile/subscription.tile.html',
                controller: 'SubscriptionTileCtrl',
                restrict: 'EA',
                transclude:true,
                scope: {
                    subscriptionPlan: "=subscriptionPlan"
                },
            };
    }]);

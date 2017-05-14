angular.module('CreateAccountApp')
    .controller('PricingCtrl', [
        '$scope',
        'CreateAccountFct',
        function($scope, CreateAccountFct) {
            // test
            SubscriptionFct.get.subscriptions().then(function(response) {
                $scope.subscriptions = response;
            });
            $scope.chooseSubscription = function(subscription) {
                $scope.chosenSubscription = subscription;
            };

            $scope.changeSelected = function(selectedid) {

                $('.selected-plan').removeClass('selected-plan');

                var result = document.getElementById(selectedid);
                var target = angular.element(result);
                target.addClass("selected-plan");
            };

        }
]);

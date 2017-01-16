angular.module('SearchApp').controller('SearchResultsTileCtrl', [
    '$scope',
    'WizioConfig',
    'TokenSvc',
    '$resource',
    '$state',
    function($scope, WizioConfig, TokenSvc, $resource, $state) {
        new Clipboard('.clipboard');
        $scope.newlyActive = false;
        $scope.userIsLoggedIn = TokenSvc.isLoggedIn();
        $scope.windowLocationOrigin = window.location.origin;
        $scope.activateListing = function(apartment){
            var user = TokenSvc.decode();
            var subscription = user.Subscriptions[0];
            console.dir(apartment);
            var data = {
                Apartment: {
                    pubid: apartment.pubid
                },
                User: {
                    id: user.id,
                    email: user.email
                },
                Subscription: {
                    pubid: subscription.pubid
                },
                UserSubscriptions: {
                    pubid: user.Subscriptions[0].UserSubscriptions.pubid
                }
            };
            $resource(WizioConfig.baseAPIURL + 'activelisting')
            .save(data, function(response){
              apartment.newlyActive = true
            });
            // $state.reload();
        };
    }
]);

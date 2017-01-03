angular.module('SearchApp').controller('SearchResultsTileCtrl', [
    '$scope',
    'WizioConfig',
    'TokenSvc',
    '$resource',
    function($scope, WizioConfig, TokenSvc, $resource) {
        new Clipboard('.clipboard');
        $scope.newlyActive = false;
        $scope.userIsLoggedIn = TokenSvc.isLoggedIn();
        $scope.windowLocationOrigin = window.location.origin;
        $scope.activateListing = function(apartment){
            var user = TokenSvc.decode();
            var subscription = user.Subscription;
            var data = {
                Apartment: {
                    pubid: apartment.apartmentData.pubid
                },
                User: {
                    id: user.id,
                    email: user.email
                },
                Subscription: {
                    pubid: subscription.pubid
                }
            };
            $resource(WizioConfig.baseAPIURL + 'activelisting')
            .save(data, function(response){
              apartment.newlyActive = true
            });
        };
    }
]);

angular.module('SearchApp').controller('SearchResultsTileCtrl', [
    '$scope',
    'WizioConfig',
    'TokenSvc',
    '$resource',
    function($scope, WizioConfig, TokenSvc, $resource) {
        new Clipboard('.clipboard');
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
                    id: user.id
                },
                Subscription: {
                    pubid: subscription.pubid
                }
            };
            $resource(WizioConfig.baseAPIURL + 'activelisting')
            .save(data, function(response){

            });
            console.dir(TokenSvc.decode());
            console.dir(apartment);
        };
    }
]);

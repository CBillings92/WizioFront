angular.module('SearchApp').controller('SearchResultsTileCtrl', [
    '$scope',
    'WizioConfig',
    'TokenSvc',
    '$resource',
    function($scope, WizioConfig, TokenSvc, $resource) {
        $scope.activateListing = function(apartment){
            var user = TokenSvc.decode();
            var subscription = user.Subscription;
            console.dir(subscription);
            console.dir(apartment.apartmentData);
            console.dir(apartment.apartmentData.pubid);
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
        }
    }
])

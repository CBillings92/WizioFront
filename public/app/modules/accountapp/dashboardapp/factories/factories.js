angular.module('AccountApp')
    .factory('DshBrdLandlordFct', [
        '$q',
        'TokenSvc',
        function($q, TokenSvc) {
            var user = TokenSvc.decode();
            function getApartmentsForExternalApi(){
                var apikey = getAPIKey();
                return new $q(function(resolve, reject) {
                    $resource(WizioConfig.baseAPIURL + 'vrapi/:apikey', {apikey: '@apikey'})
                    .query({apikey:$scope.apikey}, function (response) {
                        return resolve(lodash.uniqBy(response, 'ApartmentId'));
                    });
                });
            }
            function getAPIKey() {
                if(typeOfUser === "Brokerage"){
                    return user.Brokerages[0].Apiaccess.apikey;
                } else {
                    return user.PropertyManager[0].Apiaccess.apikey;
                }
            }
        }
    ]);

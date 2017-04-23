angular.module('AccountApp')
    .factory('ActiveListingFct', [
        'WizioConfig',
        '$resource',
        '$q',
        function(WizioConfig, $resource, $q){
            function deleteActiveListing(activeListingToDelete){
                return $q(function(resolve, reject){
                    $resource(WizioConfig.baseAPIURL + 'activelisting')
                    .delete(activeListingToDelete, function(response){
                        resolve(response);
                    });
                })
            };
            return {
                deleteActiveListing: deleteActiveListing
            }
        }
    ])

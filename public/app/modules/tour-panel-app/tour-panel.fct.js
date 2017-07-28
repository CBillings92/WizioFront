angular.module('TourPanelApp')
    .factory('TourPanelFct', [
        '$resource',
        'WizioConfig',
        '$q',
        function($resource, WizioConfig, $q) {
            function deleteActiveListing(activeListingToDelete){
                return $q(function(resolve, reject){
                    $resource(WizioConfig.baseAPIURL + 'activelisting')
                    .delete(activeListingToDelete, function(response){
                        resolve(response);
                    });
                })
            };

            function reactivateTour(tour) {
                return $q(function(resolve, reject){
                    $resource(WizioConfig.baseAPIURL + 'activelisting/activate')
                    .save(tour, function(response){
                        return resolve(response);
                    })
                })
            }
            return {
                deleteActiveListing: deleteActiveListing,
                reactivateTour: reactivateTour
            }
    }])

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

            function reassignTour(tour, subscription) {
              return $q(function(resolve, reject){
                $resource(WizioConfig.baseAPIURL + 'subscriptionapartment/reassign')
                .save({tour: tour, subscription: subscription}, function(response){
                  if(response.status === 'success'){
                    return resolve(response);
                  } else {
                    console.error(response.message);
                    return reject(response);
                  }
                })
              })
            }
            return {
                deleteActiveListing: deleteActiveListing,
                reactivateTour: reactivateTour,
                reassignTour: reassignTour
            }
    }])

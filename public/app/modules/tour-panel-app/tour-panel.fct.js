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

            function reassignTour(tour, assigneeData) {
              return $q(function(resolve, reject){
                // Setting the model of the object so the database knows if its an ActiveListing or a SubscriptionApartment
                if (assigneeData.newAccountHolder) {
                  $resource(WizioConfig.baseAPIURL + 'tourpreassignment')
                  .save({tour: tour, clientEmail: assigneeData.clientEmail}, function(response){
                    if(response.status === 'success'){
                      return resolve(response);
                    } else {
                      console.error(response.message);
                      return reject(response);
                    }
                  })
                } else {
                  $resource(WizioConfig.baseAPIURL + 'subscriptionapartment/reassign')
                  .save({tour: tour, assigneeSubscription: assigneeData}, function(response){
                    if(response.status === 'success'){
                      return resolve(response);
                    } else {
                      console.error(response.message);
                      return reject(response);
                    }
                  })
                }
              })
            }
            return {
                deleteActiveListing: deleteActiveListing,
                reactivateTour: reactivateTour,
                reassignTour: reassignTour
            }
    }])

angular.module('DeleteTourApp')
    .factory('DeleteTourModalFct', [
        '$resource',
        '$q',
        'WizioConfig',
        function( $resource, $q, WizioConfig ) {
            function deleteTour (activeListingPubId) {
                return $q(function(resolve, reject){
                    $resource(
                        WizioConfig.baseAPIURL + 'tour/:activeListingPubId',
                        {activeListingPubId: '@activeListingPubId'}
                    )
                    .delete(
                        {activeListingPubId: activeListingPubId}, {},
                        function(response){
                            return resolve(response);
                        }
                    );
                });
            }

            function deactivateTour (activeListingPubId) {
                return $q(function(resolve, reject){
                    $resource(
                        WizioConfig.baseAPIURL + 'tour/:activeListingPubId',
                        {activeListingPubId: '@activeListingPubId'}
                    )
                    .save(
                        {activeListingPubId: activeListingPubId}, {action: 'deactivate'},
                        function(response){
                            return resolve(response);
                        }
                    );
                });
            }

            return {
                deleteTour: deleteTour,
                deactivateTour: deactivateTour
            };
        }
    ]);

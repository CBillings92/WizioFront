angular.module('LandingPageApp').factory('LandingPageFct', [
    '$resource',
    '$q',
    'WizioConfig',
    function($resource, $q, WizioConfig) {
        function getUnitsForMapDisplay() {
            return $q(function(resolve, reject) {
                $resource(WizioConfig.baseAPIURL + 'apartment/landingpage/mapunits').query(function(response) {
                    if (response) {
                        resolve(response);
                    } else {
                        reject('error retrieving data');
                    }

                })
            })
        }

        return {getUnitsForLandingPageMap: getUnitsForMapDisplay}
    }
]);

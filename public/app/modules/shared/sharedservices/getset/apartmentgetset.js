angular.module('SharedServicesApp')
    .service('ApartmentGetSetSvc', [
        '$sessionStorage',
        'ApartmentResource',
        function($sessionStorage, ApartmentResource) {
            var apartmentSelected = null;
            var set = function(apartment, variableName) {
                if (variableName) {
                    $sessionStorage[variableName] = apartment;
                }

                apartmentSelected = apartment;
            };
            var get = function(apartmentId) {
                /*if(apartmentSelected !== null){
                    return apartmentSelected;
                } else {
                    ApartmentResource.query({action: 'findbyid'})
                }*/
                return apartmentSelected;
            };
            var reset = function() {
                apartmentSelected = null;
            };
            return {
                set: set,
                get: get,
                reset: reset
            };
        }
    ]);

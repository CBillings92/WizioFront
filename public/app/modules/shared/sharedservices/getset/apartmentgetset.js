angular.module('SharedServicesApp')
    .service('ApartmentGetSetSvc', [
        '$sessionStorage',
        '$stateParams',
        'ApartmentResource',
        'lodash',
        function($sessionStorage, $stateParams, ApartmentResource, lodash) {
            var apartmentSelected = null;
            var sessionStorageVarContainer = [];
            var set = function(apartment, sessionStorageVar) {
                if (sessionStorageVar) {
                    $sessionStorage[sessionStorageVar] = apartment;
                    if(lodash.indexOf(sessionStorageVarContainer, sessionStorageVar)===-1){
                        sessionStorageVarContainer.push(sessionStorageVar);
                    }
                }

                apartmentSelected = apartment;
            };
            var get = function(sessionStorageVar) {
                if(sessionStorageVar){
                    apartmentSelected = $sessionStorage[sessionStorageVar];
                    return apartmentSelected;
                } else if(apartmentSelected === null || apartmentSelected.id !== $stateParams.id){
                    ApartmentResource.get({
                        id: apartmentURLID
                    }, function(data) {
                        apartmentSelected = data;
                        console.dir(data);
                        callback(apartmentSelected);
                    });
                } else {
                    return apartmentSelected;
                }

            };
            var reset = function() {
                apartmentSelected = null;
            };
            var checkApartment = function(callback){
                //LOAD APARTMENT DATA START
                //get apartment ID from URL
                var apartmentURLID = $stateParams.id;
                //get apartment data from apartmentGetSet service
                var apartment = apartmentSelected;
                //get apartment ID from session storage if it exists
                var apartmentSessionStorageID = null;
                if ($sessionStorage.apartmentSelected) {
                    apartmentSessionStorageID = $sessionStorage.apartmentSelected.id;
                }
                //check if apartment from apartmentGetSet and sessionStorage match apartment requested in URL
                if (apartment !== null && apartment.id === apartmentURLID && apartmentSessionStorageID === apartmentURLID) {
                    callback(apartment);
                } else if (apartmentSessionStorageID == apartmentURLID) {
                    apartmentSelected = $sessionStorage.apartmentSelected;
                    callback(apartmentSelected);
                } else {
                    ApartmentResource.get({
                        id: apartmentURLID
                    }, function(data) {
                        apartmentSelected = data;
                        console.dir(data);
                        callback(apartmentSelected);
                    });
                }
            };
            return {
                set: set,
                get: get,
                reset: reset,
                checkApartment: checkApartment
            };
        }
    ]);
